import React, { useState, useEffect, useRef } from 'react';
import { CContainer, CButton, CSpinner } from '@coreui/react';
import { ColorPickers } from './ColorPickers';
import GammaSettings from './GammaSettings';
import StandardOptions from './StandardOptions';

export function GraphUI() {
    const [config, setConfig] = useState(null);
    const [debouncedConfig, setDebouncedConfig] = useState(null);
    const [serverAddress, setServerAddress] = useState('localhost');
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const debounceTimer = useRef(null);

    useEffect(() => {
        if (serverAddress) {
            fetchConfig();
        }
    }, [serverAddress]);

    useEffect(() => {
        if (config && debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (config) {
            debounceTimer.current = setTimeout(() => {
                setDebouncedConfig(config);
            }, 1000);
        }

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [config]);

    useEffect(() => {
        if (debouncedConfig) {
            updateServerConfig();
        }
    }, [debouncedConfig]);

    function fetchConfig() {
        setIsInitialLoading(true);
        fetch(getServerAddress())
            .then(response => response.json())
            .then(data => {
                const newConfig = {
                    size: parseInt(data.size, 10),
                    scale: parseInt(data.scale, 10),
                    gamma: data.gamma.split(', ').map(Number),
                    color1: data.color1.split(', ').map(Number),
                    color2: data.color2.split(', ').map(Number)
                };
                setConfig(newConfig);
                setDebouncedConfig(newConfig);
                setIsInitialLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch config:', error);
                setIsInitialLoading(false);
            });
    }

    function handleStateChange(property, value) {
        setConfig(prev => ({
            ...prev,
            [property]: value
        }));
    }

    function updateServerConfig() {
        setIsUpdating(true);
        fetch(getServerAddress(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(debouncedConfig)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Config updated successfully:', data);
                setIsUpdating(false);
            })
            .catch(error => {
                console.error('Error updating config:', error);
                setIsUpdating(false);
            });
    }

    function getServerAddress() {
        return `http://${serverAddress}:8080`;
    }

    function executeCommand(commandType) {
        setIsUpdating(true);
        fetch(getServerAddress(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: commandType })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Command executed successfully:', data);
                if (commandType === 'randomize_colors') {
                    fetchConfig();
                } else {
                    setIsUpdating(false);
                }
            })
            .catch(error => {
                console.error('Error executing command:', error);
                setIsUpdating(false);
            });
    }

    function updateOption(optionName, newValue) {
        handleStateChange(optionName, newValue);
    }

    if (isInitialLoading) {
        return <div>Loading...</div>;
    }

    if (!config) {
        return <div>Error loading configuration. Please check your server connection.</div>;
    }

    return (
        <CContainer>
            {isUpdating && (
                <div className="loading-overlay">
                    <CSpinner color="primary" />
                    <p>Updating...</p>
                </div>
            )}
            <div className="form-group">
                <label htmlFor="serverAddress">Server Address</label>
                <input
                    type="text"
                    id="serverAddress"
                    className="form-control"
                    placeholder="Enter server IP"
                    value={serverAddress}
                    onChange={(e) => setServerAddress(e.target.value)}
                />
            </div>
            <div className="main-interface">
                <div className="star-and-scale">
                    <div className="star-container">
                        <GammaSettings baseOptions={config} onUpdate={updateOption} />
                    </div>
                    <StandardOptions baseOptions={config} onUpdate={updateOption} />
                </div>
                <ColorPickers
                    r1={config.color1[0]} g1={config.color1[1]} b1={config.color1[2]}
                    onChange1={(r, g, b) => handleStateChange('color1', [r, g, b])}
                    r2={config.color2[0]} g2={config.color2[1]} b2={config.color2[2]}
                    onChange2={(r, g, b) => handleStateChange('color2', [r, g, b])}
                />
            </div>
            <div className="button-container">
                <CButton color="info" onClick={() => executeCommand('toggle_shader')}>Toggle Shader</CButton>
                <CButton color="info" onClick={() => executeCommand('randomize_colors')}>Randomize Colors</CButton>
            </div>
            <style jsx>{`
                .main-interface {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin: 20px 0;
                }
                .star-and-scale {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
                .star-container {
                    margin-right: 20px;
                }
                .button-container {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 20px;
                }
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .loading-overlay p {
                    color: white;
                    margin-top: 10px;
                }
            `}</style>
        </CContainer>
    );
}

export default GraphUI;