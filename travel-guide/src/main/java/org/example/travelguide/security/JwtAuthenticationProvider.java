package org.example.travelguide.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtAuthenticationProvider implements  InitializingBean{

	@Value("${app.jwt.secret}")
	private String jwtSecret;
	@Value("${app.jwt.expiration.milliseconds}")
	private long jwtExpiration;
	
	private SecretKey key;
	
	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parser()
						.verifyWith(key)
						.build()
						.parseSignedClaims(token)
						.getPayload();
		return claims.getSubject();
	}
	
	public boolean validateToken(String token) {
		Jwts.parser()
		.verifyWith(key)
		.build()
		.parse(token);
		return true;
		
	}
	
	public String generateToken(Authentication authentication) {
		String username = authentication.getName();
		Date currentDate  = new Date();
		Date expirationDate = new Date(currentDate.getTime()  + jwtExpiration);
		
		String token = Jwts.builder()
				.subject(username)
				.issuedAt(new Date())
				.expiration(expirationDate)
				.signWith(key)
				.compact();
		
		return token;
		
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
		
	}
}
