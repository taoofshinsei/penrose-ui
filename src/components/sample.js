import React, { useState, useEffect, useRef } from 'react';
import { CContainer, CButton } from '@coreui/react';
import { ColorPickers } from './ColorPickers';
import GammaSettings from './GammaSettings';
import StandardOptions from './StandardOptions';

export function Sample() {
    const [config, setConfig] = useState({
        size: 5,
        scale: 10,
        gamma: [0.3, 0.2, -0.1, -0.4, 0.4],
        color1: [0, 0, 0],
        color2: [255, 255, 255]
    });
    const prevState = useRef(config);
    const [serverAddress, setServerAddress] = useState('localhost');

    useEffect(() => {
        fetchConfig();
    }, []);

    useEffect(() => {
        const debounceId = setTimeout(() => {
            if (JSON.stringify(prevState.current) !== JSON.stringify(config)) {
                sendServerCommand(getPostCommand());
                prevState.current = config;
            }
        }, 500);

        return () => clearTimeout(debounceId);
    }, [config]);

    function fetchConfig() {
        setTimeout(() => { // Add delay
            fetch(getServerAddress())
                .then(response => response.json())
                .then(data => {
                    setConfig({
                        size: parseInt(data.size, 10),
                        scale: parseInt(data.scale, 10),
                        gamma: data.gamma.split(', ').map(Number),
                        color1: data.color1.split(', ').map(Number),
                        color2: data.color2.split(', ').map(Number)
                    });
                })
                .catch(error => console.error('Failed to fetch config:', error));
        }, 2000); // 2-second delay
    }

    function handleStateChange(property, value) {
        setConfig(prev => ({
            ...prev,
            [property]: value
        }));
    }

    function getPostCommand() {
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        };
    }

    function sendServerCommand(command) {
        return fetch(getServerAddress(), command)
            .then(response => response.json())
            .then(data => console.log('Command sent successfully:', data))
            .catch(error => console.error('Error sending command:', error));
    }

    function getServerAddress() {
        return 'http://' + serverAddress + ':8080';
    }

    function executeCommand(commandType) {
        sendServerCommand({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: commandType })
        }).then(() => {
            if (commandType === 'randomize_colors') {
                fetchConfig();
            }
        });
    }

    function updateOption(optionName, newValue) {
        setConfig(prev => ({
            ...prev,
            [optionName]: newValue
        }));
        sendServerCommand(getPostCommand({ [optionName]: newValue }));
    }

    return (
        <CContainer>
            <StandardOptions baseOptions={config} onUpdate={updateOption} />
            <GammaSettings baseOptions={config} onUpdate={updateOption} />
            <ColorPickers
                r1={config.color1[0]} g1={config.color1[1]} b1={config.color1[2]}
                onChange1={(r, g, b) => handleStateChange('color1', [r, g, b])}
                r2={config.color2[0]} g2={config.color2[1]} b2={config.color2[2]}
                onChange2={(r, g, b) => handleStateChange('color2', [r, g, b])}
            />
            <div>
                <CButton color="info" onClick={() => executeCommand('toggle_shader')}>Toggle Shader</CButton>
                <CButton color="info" onClick={() => executeCommand('randomize_colors')}>Randomize Colors</CButton>
            </div>
        </CContainer>
    );
}

export default Sample;
