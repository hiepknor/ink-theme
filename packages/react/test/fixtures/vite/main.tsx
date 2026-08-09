import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@hiepknor/ink-react';

createRoot(document.querySelector('#root')!).render(createElement(Button, null, 'Ready'));
