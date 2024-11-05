package com.tiffin.service;

import com.tiffin.dto.SignInResDTO;
import com.tiffin.dto.UserSignInReqDTO;

public interface AuthenticationService {
	public SignInResDTO authenticateUser(UserSignInReqDTO userSignIn);
}
