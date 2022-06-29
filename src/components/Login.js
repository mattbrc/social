import React from "react"

function Login() {
    // Create a function to render if Lens account is not connected yet
    const renderNotConnectedContainer = () => (
        <div>
            <h1>Sparta</h1>
            <p>
            Sparta is a social fitness app built on &nbsp;  
            <a
                className="App-link"
                href="https://lens.xyz/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Lens
            </a> 
            </p>
            <button onClick={""} className='cta-button connect-button'>
            Sign in with Lens
            </button>
            <div className='sub-text'>
                <p>Don't have a Lens profile yet?</p>
                <p>Get one &nbsp;
                    <a
                        className="App-link"
                        href="https://claim.lens.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >here</a>
                </p>
            </div>
        </div>
      );
    
    return (
        <div className="not-connected-container">
            { renderNotConnectedContainer() }
        </div>
    );
}

export default Login