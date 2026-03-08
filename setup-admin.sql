-- Add admin role to the roles table
INSERT INTO `roles` VALUES ('admin', 'Administrator with full access');

-- Assign admin role to a specific user (replace USER_ID with the actual user_id)
-- Example: If user with user_id = 1 should be admin
INSERT INTO `user_roles` (user_id, role_id) VALUES (1, 'admin');

-- Or assign admin role by email (replace 'your-email@example.com' with actual email)
INSERT INTO `user_roles` (user_id, role_id)
SELECT user_id, 'admin' FROM users WHERE email = 'your-email@example.com';

-- To check if admin role was assigned correctly:
SELECT u.user_id, u.email, u.full_name, ur.role_id 
FROM users u
JOIN user_roles ur ON u.user_id = ur.user_id
WHERE ur.role_id = 'admin';
