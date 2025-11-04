import React from 'react';

interface DottedBackgroundProps {
    className?: string;
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({ className = '' }) => {
    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                backgroundImage: `
          radial-gradient(circle, #868E96 1px, transparent 1px)
        `,
                backgroundSize: '17px 17px',
                backgroundRepeat: 'repeat',
                opacity: 0.3,
                zIndex: 0
            }}
        />
    );
};

export default DottedBackground;

