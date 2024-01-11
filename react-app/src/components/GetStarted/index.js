import React, { useState } from 'react';
import './GetStarted.css';

function GetStarted() {
    const steps = [
        {
            heading: 'categories & suppliers',
            content: 'Start by creating categories and suppliers to easily organize your items'
        },
        {
            heading: 'items',
            content: 'Now you can create your first item, its optional to select a category or supplier',

        },
        {
            heading: 'inventory sheets',
            content: "Once you have all your items in your inventory, you're ready to create an inventory sheet, all your items will be there and all you have to do is input the quantities",
        }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const goToNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goBackStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };


    return (
        <div className="get-started-container">
            <h1>just three quick steps</h1>
            <div className="step-card">
                <p className='step-number'>{currentStep + 1}</p>
                <span id='step-icon' class="material-symbols-outlined">inventory_2</span>
                <p className='step-heading'>{steps[currentStep].heading}</p>
                <p>{steps[currentStep].content}</p>
                {currentStep < steps.length - 1 && currentStep !== 0 && (
                    <>
                        <button onClick={goBackStep}>go back</button>
                        <button onClick={goToNextStep}>Next Step</button>
                    </>
                )}

                {currentStep === 0 && <button onClick={goToNextStep}>Next Step</button>}
                {currentStep === steps.length - 1 && <button onClick={goBackStep}>go back</button>}
            </div>
        </div>
    );
}

export default GetStarted;
