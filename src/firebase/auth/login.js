import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "react-router-dom";

export const login = async (request) => {
    try {
        const formData = await request.formData();

        // Sanitize and trim input data
        const email = formData.get('email');
        const password = formData.get('password')?.trim() || '';

        const errors = {};

        const validationRules = {
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: {
                    required: "Email is required",
                    pattern: "Invalid email format"
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
        }

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

        // Return validation result
        if (Object.keys(errors).length > 0) {
            return {
                success: false,
                errors,
                message: "Please fix the validation errors"
            };
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            return redirect("/profile");
        } catch (firebaseError) {
            console.error(firebaseError);
            return generateLoginErrors(firebaseError.code);
        }
        

    } catch (error) {
        console.error('Form validation error:', error);
        return {
            success: false,
            message: "An unexpected error occurred during form validation",
            error: error.message
        };
    }
}

export const generateLoginErrors = (errorCode) => {
    const errorMessages = {
        'auth/invalid-email': 'The email address is not valid.',
        'auth/user-not-found': 'No user found with this email. Please sign up first.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/user-disabled': 'This account has been disabled. Please contact support.',
        'auth/too-many-requests': 'Too many failed login attempts. Please try again later.',
        'auth/network-request-failed': 'Network error occurred. Please check your internet connection.',
        'auth/invalid-credential': 'Invalid or expired credentials. Please try again or create an account.',
        'auth/account-exists-with-different-credential': 'An account exists with a different login method. Try another provider.',
        'default': 'An unexpected error occurred during login. Please try again.'
    };

    return {
        success: false,
        message: errorMessages[errorCode] || errorMessages.default,
        errorCode
    };
};