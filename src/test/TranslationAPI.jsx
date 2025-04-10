import { useEffect, useState } from "react";

export default function TranslationAPI(){
    const [translation, setTranslation] = useState('');
    //*attention:so the varible "translation" and the function "setTranslation" have already been defined
    const apiKey = '8dd9ce8e-032f-42ed-af73-c2de472febbf:fx';//*may need to be changed after one month trial time

    useEffect(()=>{
        fetch('/api/v2/translate',{
            //*Vite rewrites /api requests to the real API URL during development.
            //*There's no need to import vite.config.js in React — the proxy is already handled at build time.
            method:'POST',
            headers:{
                'Authorization': `DeepL-Auth-Key ${apiKey}`,
                'Content-Type':'application/json', //* a must when using POST, and also with JSON.stringify()
                //*'Content-Length':97 and other headers are automatically added by the proxy, can't define them
            },
            body:JSON.stringify({
                text: ['Hello, world!'], //* text must be an array of strings
                target_lang:'ZH-HANS'
            })
        })
        .then(response=>response.json())
        .then(data=>setTranslation(data.translations[0].text)) //*according to the example response, the translation is in the translations[0].text
        .catch(error=>console.error('Error:',error))
    },[])

    return(
        <div>
            <h1>Translation</h1>
            <p>{translation}</p>
        </div>
    )
    
}