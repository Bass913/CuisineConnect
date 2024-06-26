import React from 'react';

function AuthenticationLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-1">
            {children}
            <div className="relative hidden w-0 flex-1 lg:block">
                <img className="absolute inset-0 h-full w-full object-cover" src="/recipe.jpg" alt="Cuisine Connect" />
            </div>
        </div>
    );
}

export default AuthenticationLayout;
