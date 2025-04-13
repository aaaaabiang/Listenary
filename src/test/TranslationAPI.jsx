import { useState } from "react";

export default function TranslationAPI({ textToTranslate, targetLang, onTranslationComplete }){
    const apiKey = '8dd9ce8e-032f-42ed-af73-c2de472febbf:fx';

    const translate = async () => {
        if (!textToTranslate || !targetLang) return '';
        
        try {
            const response = await fetch('/api/v2/translate', {
                method: 'POST',
                headers: {
                    'Authorization': `DeepL-Auth-Key ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: [textToTranslate], //* text must be an array of strings
                    target_lang: targetLang
                })
            });

            const data = await response.json();
            const translatedText = data.translations[0].text; //*according to the example response, the translation is in the translations[0].text
            
            if (onTranslationComplete) {
                onTranslationComplete(translatedText);
            }
            
            return translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return '';
        }
    };

    return { translate };
}