import React, { Component } from 'react';
import { CContainer } from '@coreui/react';
import { ColorPickers } from './ColorPickers';

export function Sample() {
    // TODO: figure out how to access non-local machine (or does this act as a server that devices connect to?) 
    function getServerAddress() {
        return 'http://localhost:8080';
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
        var template = getDefaultPost();
        for (let key in jsonBlob) {
            template[key] = jsonBlob[key];
        }
        return {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(template)
        };
    };

    function generateRGBString(r, g, b) {
        return '[' + r + ', ' + g + ', ' + b + ']';
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

    function sendServerCommand(command) {
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
            })
            .catch(error => {
                console.error('There was an error sending command to the server: ' + error);
            });
    };

    return (
        <CContainer>
            <ColorPickers r1={0} g1={0} b1={0}  onChange1={setColor1} r2={255} g2={255} b2={255} onChange2={setColor2}/>
        </CContainer>
    );
}

export default Sample;