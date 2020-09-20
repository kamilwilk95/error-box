class ErrorBox extends HTMLElement {
    constructor() {
        super();
        this.selftRemove = false;
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.shadow.innerHTML = `
            <style>
                body {
                    background: red;
                }
                
                .error-wraper {
                    display: inline-block;
                    padding: 10px 20px;
                    border-radius: 8px;
                    background: #E53935;
                    color: #ffffff;
                    font-size: 20px;
                }
                
                .close-button {
                    display: inline-block;
                    cursor: pointer;
                    padding-left: 20px;
                }
            </style>
            <div class="error-wraper">
                <slot></slot>
                <div class="close-button">&#10006;</div>
            </div>`;

        this.shadow.querySelector('.close-button').addEventListener('click', () => {
            
            const event = new CustomEvent('remove', {
                bubbles: true,
                //we need set this option to three, if we wont catch our event outside ShadowDOM
                composed: true
            });

            this.shadow.dispatchEvent(event);

            if (this.selftRemove) {
                this.remove();
            }
        });
    }

    static get observedAttributes() {
        //we need use self-remove, not selfRemove
        return ['self-remove'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.', name, newValue);
        switch (name) {
            case 'self-remove': {
                this.selftRemove = true;
                break;
            }
        }
    }
}

window.customElements.define('error-box', ErrorBox);