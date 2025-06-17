import * as arctic from 'arctic';
import AppError from '../../../shared/utils/appError.js';
import User from '../../../shared/models/user.model.js';
import { generateUniqueUsername } from '../utils/generateUniqueUsername.js';
import { sendCookiesAndRecieveToken } from '../utils/sendCookiesAndToken.js';

const google = new arctic.Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const redirectToGoogleOauth = async (req, res, next) => {
  try {
    // generate essentials
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scope = ['openid', 'profile', 'email'];

    // the redirected uri
    const redirectUri = google.createAuthorizationURL(
      state,
      codeVerifier,
      scope
    );

    // cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000,
    };

    // cookies
    res.cookie('state', state, options);
    res.cookie('codeVerifier', codeVerifier, options);

    return res.redirect(redirectUri.toString());
  } catch (error) {
    next(error);
  }
};

export const googleOauthCallback = async (req, res, next) => {
  // validations
  if (
    !req.query.state ||
    !req.query.code ||
    !req.cookies.state ||
    !req.cookies.codeVerifier
  ) {
    throw new AppError('Invalid requrest, Try again later', 400);
  }

  // variables
  const { state, code } = req.query;
  const { codeVerifier, state: storedState } = req.cookies;

  if (state !== storedState) {
    throw new AppError('State mismatch. Potential CSRF attack.', 400);
  }

  // validating tokens
  let tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch {
    throw new AppError(
      "Couldn't login with Google because of invalid login attempt, Please try again later",
      500
    );
  }

  // decoding claims
  let claims;
  try {
    claims = arctic.decodeIdToken(tokens.idToken());
  } catch (err) {
    return next(new AppError('Failed to decode Google ID token', 500));
  }

  // decoded claims actual data that needed
  const { sub: providerId, email, name, picture: profileImg } = claims;

  // check if user exists
  let user = await User.findOne({ email });
  let isNew = false;

  if (!user) {
    // generate username
    const username = await generateUniqueUsername(name);

    // create new user
    user = await User.create({
      email,
      username,
      profileImg,
      provider: ['google'],
      providerId,
      isVerified: true,
    });

    isNew = true;
  } else {
    // if user is logged in with email and password then do this
    if (user && !user.providerId && user.isVerified === false) {
      user.providerId = providerId;
      user.isVerified = true;
      if (!user.provider.includes('google')) {
        user.provider.push('google');
      }
      if (!user.profileImg) {
        user.profileImg = profileImg;
      }

      await user.save();
    }
  }

  // generate tokens and send cookies
  const { accessToken, refreshToken } = sendCookiesAndRecieveToken(
    user.username,
    user.activeRole,
    res
  );

  // save refresh token
  user.refreshToken = refreshToken;
  await user.save();

  // final response
  res.redirect('the place i want will add it later');
};
