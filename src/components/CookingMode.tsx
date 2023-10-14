import React from 'react';

function CookingMode() {
    return (
        <div>
            <h1>Cooking Mode</h1>
            
            <section>
                <h2>Ingredients</h2>
                <p>Placeholder for ingredients. You can list ingredients here or fetch and display them dynamically.</p>
            </section>

            <section>
                <h2>Instructions</h2>
                <p>Placeholder for cooking instructions. You can list steps here or fetch and display them dynamically.</p>
            </section>

            <button onClick={() => window.location.href = "/"}>
                Back to Home
            </button>
        </div>
    );
}

export default CookingMode;
