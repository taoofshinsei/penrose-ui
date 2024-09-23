import React, { useMemo, useState } from 'react';
import { Button, Container } from '@mui/material';
import { ColorPickers } from './ColorPickers';
import GammaSettings from './GammaSettings';
import StandardOptions from './StandardOptions';
import SettingsDialog from './SettingsDialog';
import SettingsIcon from '@mui/icons-material/Settings';

export function Sample() {
    const [serverSettings, setServerSettings] = useState(getDefaultPost());
    const [serverAddress, setServerAddress] = useState('localhost');
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Initializer to get the initial state of the penrose tile app
    useMemo(() => {
        sendServerCommand(getGetCommand(), setServerSettings);
    }, [serverAddress]);

    // TODO: figure out how to access non-local machine (or does this act as a server that devices connect to?) 
    function getServerAddress() {
        return 'http://' + serverAddress + ':8080';
    };

    function getDefaultPost() {
        // TODO: initialize with a GET call to get the default values and update the default post to reflect those values? Or just do something smarter idk
        var template = {
            "height": 1000,
            "width": 1920,
            "scale": 60,
            "size": 5,
            "gamma": [0.3, 0.2, -0.1, -0.4, 0.4],
            "color1": [200, 75, 0],
            "color2": [255, 255, 0]
        };
        return template;
    }

    // POST request to change configuration
    function getPostCommand(jsonBlob) {
        var template = serverSettings;
        for (let key in jsonBlob) {
            template[key] = jsonBlob[key];
        }
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(template)
        };
    };

    function getGetCommand() {
        return {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    }

    function generateRGBString(r, g, b) {
        return [r, g, b];
    };

    function setColor1(r, g, b) {
        console.log('setColor1: ' + r + ', ' + g + ', ' + b);
        sendServerCommand(getPostCommand({ "color1": generateRGBString(r, g, b) }));
    };

    function setColor2(r, g, b) {
        console.log('setColor2: ' + r + ', ' + g + ', ' + b);
        sendServerCommand(getPostCommand({ "color2": generateRGBString(r, g, b) }));
    };

    function printDebug(command) {
        var body = command['body'];
        console.log('start debug');
        console.log(body);
        console.log('end debug');
    }

    function sendServerCommand(command, dataParser) {
        printDebug(command);
        fetch(getServerAddress(), command)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                console.log('No errors sending command.');
                console.log(data);
                if (dataParser !== undefined) {
                    dataParser(data);
                }
            })
            .catch(error => {
                console.error('There was an error sending command to the server: ' + error);
            });
    };

    function updateOption(optionName, newValue) {
        var newSettings = serverSettings;
        newSettings[optionName] = newValue;
        setServerSettings(newSettings);
        sendServerCommand(getPostCommand(newSettings));
    }

    return (
        <Container maxWidth='xl'>
            <Button onClick={() => setSettingsOpen(true)} startIcon={<SettingsIcon/>} />
            <SettingsDialog baseOptions={serverSettings} onUpdate={updateOption} isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
            <GammaSettings baseOptions={serverSettings} onUpdate={updateOption} />
            <ColorPickers r1={0} g1={0} b1={0}  onChange1={setColor1} r2={255} g2={255} b2={255} onChange2={setColor2}/>
        </Container>
    );
}

export default Sample;