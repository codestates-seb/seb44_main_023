package com.main.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.main.server.auth.AuthController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Date;


@Component
public class JwtTokenizer {

    @Value("${jwt.key.secret}")
    private String secretKey;

    private Algorithm algorithm;
    private JWTVerifier jwtVerifier;

    private long accessTokenExpirationTime = 86400000; // 1일
    private long refreshTokenExpirationTime = 1209600000; // 2주

    @Autowired
    private TokenBlacklist tokenBlacklist;

    @PostConstruct
    public void init() {
        algorithm = Algorithm.HMAC256(secretKey);
        jwtVerifier = JWT.require(algorithm).build();
    }
  
    public String generateToken(String subject, long accessTokenExpirationTime) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + accessTokenExpirationTime);

        String generatedToken = JWT.create()
                .withSubject(subject)
                .withIssuedAt(now)
                .withExpiresAt(expirationDate)
                .sign(algorithm);

        return generatedToken;
    }

    public String generateAccessToken(String subject) {
        return generateToken(subject, accessTokenExpirationTime);

    }

    public String generateRefreshToken(String subject) {
        return generateToken(subject, refreshTokenExpirationTime);
    }

    public String getVerifiedSubject(String token) throws JWTVerificationException {
        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        String subject = decodedJWT.getSubject();

        return subject;
    }
    public boolean validateToken(String token) {
        try {
            jwtVerifier.verify(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }
}
