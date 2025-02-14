import React from 'react';
import { TextStyle } from 'react-native';
import { CallbackOnBackHandler, CallbackOrActions } from './PropsType';
export default function prompt(title: React.ReactNode, message: React.ReactNode, callbackOrActions: CallbackOrActions<TextStyle>, type?: string, defaultValue?: string, placeholders?: string[], onBackHandler?: CallbackOnBackHandler): number | undefined;
