// Amazon Sign-In Page Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    const emailInput = document.getElementById('email-input');
    const emailError = document.getElementById('email-error');
    const passwordGroup = document.getElementById('password-group');
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');
    const continueBtn = document.getElementById('continue-btn');
    const helpToggle = document.getElementById('help-toggle');
    const helpLinks = document.getElementById('help-links');
    const helpIcon = document.getElementById('help-icon');
    const createAccountBtn = document.getElementById('create-account-btn');

    let isPasswordStep = false;

    // Help accordion toggle
    if (helpToggle && helpLinks) {
        helpToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = helpLinks.style.display === 'flex';
            helpLinks.style.display = isOpen ? 'none' : 'flex';
            if (helpIcon) {
                helpIcon.className = isOpen ? 'fa-solid fa-caret-right' : 'fa-solid fa-caret-down';
            }
        });
    }

    // Input error handling reset
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('input-error');
        emailError.style.display = 'none';
    });

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            passwordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
        });
    }

    // Form step submission
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!isPasswordStep) {
                // Step 1: Validate Email/Phone
                const emailVal = emailInput.value.trim();
                if (!emailVal) {
                    emailInput.classList.add('input-error');
                    emailError.style.display = 'block';
                    emailInput.focus();
                    return;
                }

                // Transition to Step 2: Show Password Field
                isPasswordStep = true;
                passwordGroup.style.display = 'block';
                continueBtn.innerText = 'Sign in';
                emailInput.readOnly = true;
                emailInput.style.backgroundColor = '#f6f6f6';
                passwordInput.focus();

            } else {
                // Step 2: Validate Password
                const passVal = passwordInput.value.trim();
                if (!passVal) {
                    passwordInput.classList.add('input-error');
                    passwordError.style.display = 'block';
                    passwordInput.focus();
                    return;
                }

                // Simulate successful Sign In
                alert(`Welcome back! Successfully signed in as ${emailInput.value.trim()}`);
                window.location.href = 'index.html';
            }
        });
    }

    // Create Account Button click demo
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Registration feature coming soon! You can test signing in with any email.');
        });
    }
});
