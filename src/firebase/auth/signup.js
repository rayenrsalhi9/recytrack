import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config';
import { redirect } from "react-router-dom";

export const createAccount = async (request) => {
    try {
        const formData = await request.formData();
        
        // Sanitize and trim input data
        const { username = '', email = '', phone = '' } = Object.fromEntries(formData);
        const password = formData.get('password')?.trim() || '';
        const confirmPassword = formData.get('confirm-password')?.trim() || '';

        const errors = {};
        const validationRules = {
            username: {
                required: true,
                minLength: 3,
                maxLength: 30,
                pattern: /^[a-zA-Z0-9_-]+$/,
                message: {
                    required: "Username is required",
                    minLength: "Username must be at least 3 characters",
                    maxLength: "Username must be less than 30 characters",
                    pattern: "Username can only contain letters, numbers, underscores and hyphens"
                }
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: {
                    required: "Email is required",
                    pattern: "Invalid email format"
                }
            },
            phone: {
                required: true,
                pattern: /^\+?[1-9]\d{1,14}$/,
                message: {
                    required: "Phone number is required",
                    pattern: "Invalid phone number format (E.164 format recommended)"
                }
            },
            password: {
                required: true,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: {
                    required: "Password is required",
                    minLength: "Password must be at least 8 characters long",
                    pattern: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                }
            }
        };

        // Validate all fields using validation rules
        Object.entries(validationRules).forEach(([field, rules]) => {
            const value = field === 'password' ? password : eval(field);

            if (rules.required && !value) {
                errors[field] = rules.message.required;
            } else if (value) {
                if (rules.minLength && value.length < rules.minLength) {
                    errors[field] = rules.message.minLength;
                }
                if (rules.maxLength && value.length > rules.maxLength) {
                    errors[field] = rules.message.maxLength;
                }
                if (rules.pattern && !rules.pattern.test(value)) {
                    errors[field] = rules.message.pattern;
                }
            }
        });

        // Special validation for password confirmation
        if (!confirmPassword) {
            errors.confirmPassword = "Password confirmation is required";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        // Return validation result
        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                errors,
                message: "Please fix the validation errors"
            };
        }

        // Create user with Firebase
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return redirect("/profile");
        } catch (firebaseError) {
            return generateSignupErrors(firebaseError.code);
        }

    } catch (error) {
        console.error('Form validation error:', error);
        return {
            success: false,
            message: "An unexpected error occurred during form validation",
            error: error.message
        };
    }
};

export const generateSignupErrors = (errorCode) => {
    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered. Please use a different email or try logging in.',
        'auth/invalid-email': 'The email address is not valid.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
        'auth/weak-password': 'The password is too weak. Please choose a stronger password.',
        'auth/network-request-failed': 'Network error occurred. Please check your internet connection.',
        'auth/too-many-requests': 'Too many unsuccessful attempts. Please try again later.',
        'auth/user-disabled': 'This account has been disabled. Please contact support.',
        'auth/invalid-credential': 'The provided credentials are invalid or expired.',
        'default': 'An unexpected error occurred. Please try again.'
    };

    return {
        success: false,
        message: errorMessages[errorCode] || errorMessages.default,
        errorCode
    };
};