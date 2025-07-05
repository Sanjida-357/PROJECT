// Show specific page
function showPage(page) {
    document.querySelectorAll('.auth-page').forEach(el => el.classList.remove('active'));
    document.getElementById(`${page}Page`).classList.add('active');
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Password strength calculator
function updatePasswordStrength(password, formType) {
    let strength = 0;
    if (password.length > 0) strength += 20;
    if (password.length > 6) strength += 20;
    if (password.length > 10) strength += 20;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    
    const indicator = document.querySelector(`#${formType}Password`).parentElement.nextElementSibling;
    indicator.className = 'password-strength';
    
    if (password.length > 0) {
        indicator.classList.add(
            strength < 40 ? 'weak' : 
            strength < 70 ? 'medium' : 'strong'
        );
    }
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Setup form submissions
function setupForms() {
    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const button = document.getElementById('loginButton');
        button.classList.add('loading');
        
        // Get form values
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validate inputs
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.input-with-icon').forEach(el => el.classList.remove('error'));
        
        if (!email) {
            document.getElementById('loginEmailError').textContent = 'Email is required';
            document.getElementById('loginEmail').parentElement.classList.add('error');
            isValid = false;
        } else if (!validateEmail(email)) {
            document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
            document.getElementById('loginEmail').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!password) {
            document.getElementById('loginPasswordError').textContent = 'Password is required';
            document.getElementById('loginPassword').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) {
            button.classList.remove('loading');
            return;
        }
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success case
            document.getElementById('loginEmail').parentElement.classList.add('success');
            document.getElementById('loginPassword').parentElement.classList.add('success');
            
            console.log('Login successful', { email, password, rememberMe });
            alert('Login successful! Redirecting to dashboard...');
            
            // In a real app, you would redirect here
            // window.location.href = '/dashboard';
            
        } catch (error) {
            console.error('Login error:', error);
            document.getElementById('loginEmailError').textContent = 'Invalid email or password';
            document.getElementById('loginEmail').parentElement.classList.add('error');
            document.getElementById('loginPassword').parentElement.classList.add('error');
        } finally {
            button.classList.remove('loading');
        }
    });
    
    // Signup form
    document.getElementById('signupForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const button = document.getElementById('signupButton');
        button.classList.add('loading');
        
        // Get form values
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        // Validate inputs
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.input-with-icon').forEach(el => el.classList.remove('error'));
        
        if (!name) {
            document.getElementById('signupNameError').textContent = 'Name is required';
            document.getElementById('signupName').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!email) {
            document.getElementById('signupEmailError').textContent = 'Email is required';
            document.getElementById('signupEmail').parentElement.classList.add('error');
            isValid = false;
        } else if (!validateEmail(email)) {
            document.getElementById('signupEmailError').textContent = 'Please enter a valid email';
            document.getElementById('signupEmail').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!password) {
            document.getElementById('signupPasswordError').textContent = 'Password is required';
            document.getElementById('signupPassword').parentElement.classList.add('error');
            isValid = false;
        } else if (password.length < 8) {
            document.getElementById('signupPasswordError').textContent = 'Password must be at least 8 characters';
            document.getElementById('signupPassword').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!confirmPassword) {
            document.getElementById('signupConfirmPasswordError').textContent = 'Please confirm your password';
            document.getElementById('signupConfirmPassword').parentElement.classList.add('error');
            isValid = false;
        } else if (password !== confirmPassword) {
            document.getElementById('signupConfirmPasswordError').textContent = 'Passwords do not match';
            document.getElementById('signupConfirmPassword').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) {
            button.classList.remove('loading');
            return;
        }
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success case
            document.querySelectorAll('.input-with-icon').forEach(el => el.classList.add('success'));
            
            console.log('Signup successful', { name, email, password });
            alert('Account created successfully! Redirecting to login...');
            showPage('login');
            
        } catch (error) {
            console.error('Signup error:', error);
            document.getElementById('signupEmailError').textContent = 'Email already exists';
            document.getElementById('signupEmail').parentElement.classList.add('error');
        } finally {
            button.classList.remove('loading');
        }
    });
    
    // Forgot password form
    document.getElementById('forgotPasswordForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const button = document.getElementById('forgotPasswordButton');
        button.classList.add('loading');
        
        const email = document.getElementById('forgotEmail').value.trim();
        
        // Validate email
        document.getElementById('forgotEmailError').textContent = '';
        document.getElementById('forgotEmail').parentElement.classList.remove('error');
        
        if (!email) {
            document.getElementById('forgotEmailError').textContent = 'Email is required';
            document.getElementById('forgotEmail').parentElement.classList.add('error');
            button.classList.remove('loading');
            return;
        } else if (!validateEmail(email)) {
            document.getElementById('forgotEmailError').textContent = 'Please enter a valid email';
            document.getElementById('forgotEmail').parentElement.classList.add('error');
            button.classList.remove('loading');
            return;
        }
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success case
            document.getElementById('forgotEmail').parentElement.classList.add('success');
            alert('Password reset link sent to your email!');
            showPage('login');
            
        } catch (error) {
            console.error('Forgot password error:', error);
            document.getElementById('forgotEmailError').textContent = 'Email not found';
            document.getElementById('forgotEmail').parentElement.classList.add('error');
        } finally {
            button.classList.remove('loading');
        }
    });
    
    // Reset password form
    document.getElementById('resetPasswordForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const button = document.getElementById('resetPasswordButton');
        button.classList.add('loading');
        
        const password = document.getElementById('resetPassword').value;
        const confirmPassword = document.getElementById('resetConfirmPassword').value;
        
        // Validate inputs
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.input-with-icon').forEach(el => el.classList.remove('error'));
        
        if (!password) {
            document.getElementById('resetPasswordError').textContent = 'Password is required';
            document.getElementById('resetPassword').parentElement.classList.add('error');
            isValid = false;
        } else if (password.length < 8) {
            document.getElementById('resetPasswordError').textContent = 'Password must be at least 8 characters';
            document.getElementById('resetPassword').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!confirmPassword) {
            document.getElementById('resetConfirmPasswordError').textContent = 'Please confirm your password';
            document.getElementById('resetConfirmPassword').parentElement.classList.add('error');
            isValid = false;
        } else if (password !== confirmPassword) {
            document.getElementById('resetConfirmPasswordError').textContent = 'Passwords do not match';
            document.getElementById('resetConfirmPassword').parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) {
            button.classList.remove('loading');
            return;
        }
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success case
            document.querySelectorAll('.input-with-icon').forEach(el => el.classList.add('success'));
            alert('Password updated successfully! Redirecting to login...');
            showPage('login');
            
        } catch (error) {
            console.error('Reset password error:', error);
            alert('Failed to update password. Please try again.');
        } finally {
            button.classList.remove('loading');
        }
    });
    
    // Password strength indicators
    document.getElementById('signupPassword')?.addEventListener('input', function(e) {
        updatePasswordStrength(e.target.value, 'signup');
    });
    
    document.getElementById('resetPassword')?.addEventListener('input', function(e) {
        updatePasswordStrength(e.target.value, 'reset');
    });
}

// Social login buttons
function setupSocialLogin() {
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('google') ? 'Google' : 
                            this.classList.contains('facebook') ? 'Facebook' : 'Twitter';
            alert(`${provider} login would be implemented here`);
        });
    });
}

// Initialize the application
function initAuth() {
    setupForms();
    setupSocialLogin();
    
    // Show login page by default
    showPage('login');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);