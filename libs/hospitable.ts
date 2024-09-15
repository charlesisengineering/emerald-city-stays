import { searchWidgetProps } from '@/types/userTypes'
import { useEffect } from 'react'

export default function buildSearchWidget(inputProps:searchWidgetProps){
    useEffect(() => {
        // find the hospitable widget element
        const widgetDiv = document.getElementById(inputProps.widgetElement);

        // set up configuration for the Hospitable widget
        const configElement = document.createElement('hospitable-direct-mps');
        configElement.setAttribute('identifier', "5fb3442b-ded2-4e6b-be42-0292dcd8042a");
        configElement.setAttribute('type', "custom");
        if (inputProps.searchAttribute) configElement.setAttribute('results-url', "/search");
        widgetDiv.appendChild(configElement);

        // load the Hospitable script
        const script = document.createElement('script');
        script.src = "https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js";
        script.async = true;
        widgetDiv.appendChild(script);

        return () => {
            widgetDiv.removeChild(script);
            widgetDiv.removeChild(configElement);
        }

    })

}