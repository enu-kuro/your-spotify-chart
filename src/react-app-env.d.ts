/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        REACT_APP_CLIENT_ID: string
        REACT_APP_REDIRECT_URI: string
        }
    }
