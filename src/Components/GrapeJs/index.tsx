import React, { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";

export default function GrapeJs() {
    const [htmlString, setHtmlString] = useState(null);
    const [cssString, setCssString] = useState("");
    const [pluginLoaded, setPluginLoaded] = useState(false);
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        if (!editor) {
            const es = grapesjs.init({
                container: "#sample",
                plugins: ["sample-preset-newsletter"],
                pluginsOpts: {
                    "sample-preset-newsletter": {
                        modalTitleImport: "Import template"
                    }
                },
                blockManager: {
                    appendTo: "#blocks",
                    blocks: [
                        {
                            id: "section", // id is mandatory
                            label: "<b>Section</b>", // You can use HTML/SVG inside labels
                            attributes: { class: "sample-block-section" },
                            content: `<section>
                <h1>This is a simple title</h1>
                <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
              </section>`
                        },
                        {
                            id: "text",
                            label: "Text",
                            content: '<div data-sample-type="text">Insert your text here</div>'
                        },
                        {
                            id: "image",
                            label: "Image",
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: { type: "image" },
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true
                        }
                    ]
                }
            });
            setEditor(null);
        }
    }, []);
    return (
        <div>
                <div id="sample" />
                <div id="blocks" />
        </div>
    );
}
