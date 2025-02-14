import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Input, Label, Text, View } from '@tarojs/components';
function getInputProps(props) {
    const actualProps = {
        type: props.type,
        maxLength: props.maxLength || props.maxlength,
        disabled: props.disabled,
        password: false
    };
    switch (actualProps.type) {
        case 'phone':
            actualProps.type = 'number';
            actualProps.maxLength = 11;
            break;
        case 'password':
            actualProps.type = 'text';
            actualProps.password = true;
            break;
        default:
            break;
    }
    if (!props.disabled && !props.editable) {
        actualProps.disabled = true;
    }
    return actualProps;
}
export default class AtInput extends React.Component {
    constructor() {
        super(...arguments);
        // TODO: 有待考证是否为合理方式处理 #840
        this.inputClearing = false;
        this.handleInput = (event) => { var _a, _b; return (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, event.detail.value, event); };
        this.handleFocus = (event) => {
            if (typeof this.props.onFocus === 'function') {
                this.props.onFocus(event.detail.value, event);
            }
        };
        this.handleBlur = (event) => {
            var _a, _b;
            if (typeof this.props.onBlur === 'function') {
                this.props.onBlur(event.detail.value, event);
            }
            if (event.type === 'blur' && !this.inputClearing) {
                // fix # 583 AtInput 不触发 onChange 的问题
                (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, event.detail.value, event);
            }
            // 还原状态
            this.inputClearing = false;
        };
        this.handleConfirm = (event) => {
            if (typeof this.props.onConfirm === 'function') {
                this.props.onConfirm(event.detail.value, event);
            }
        };
        this.handleClick = (event) => {
            if (!this.props.editable && typeof this.props.onClick === 'function') {
                this.props.onClick(event);
            }
        };
        this.handleClearValue = (event) => {
            var _a, _b;
            this.inputClearing = true;
            (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, '', event);
        };
        this.handleKeyboardHeightChange = (event) => {
            if (typeof this.props.onKeyboardHeightChange === 'function') {
                this.props.onKeyboardHeightChange(event);
            }
        };
        this.handleErrorClick = (event) => {
            if (typeof this.props.onErrorClick === 'function') {
                this.props.onErrorClick(event);
            }
        };
    }
    render() {
        const { className, customStyle, name, cursorSpacing, confirmType, cursor, selectionStart, selectionEnd, adjustPosition, border, title, error, clear, placeholder, placeholderStyle, placeholderClass, autoFocus = false, focus = false, value, required } = this.props;
        const { type, maxLength, disabled, password } = getInputProps(this.props);
        const rootCls = classNames('at-input', {
            'at-input--without-border': !border
        }, className);
        const containerCls = classNames('at-input__container', {
            'at-input--error': error,
            'at-input--disabled': disabled
        });
        // TODO: overlayCls 是否需要移除
        const overlayCls = classNames('at-input__overlay', {
            'at-input__overlay--hidden': !disabled
        });
        const placeholderCls = classNames('placeholder', placeholderClass);
        const id = name && { id: name };
        return (React.createElement(View, { className: rootCls, style: customStyle },
            React.createElement(View, { className: containerCls },
                React.createElement(View, { className: overlayCls, onClick: this.handleClick }),
                title && (React.createElement(Label, { className: `at-input__title ${required && 'at-input__title--required'}`, for: name }, title)),
                React.createElement(Input, Object.assign({ className: 'at-input__input' }, id, { name: name, type: type, disabled: disabled, password: password, placeholderStyle: placeholderStyle, placeholderClass: placeholderCls, placeholder: placeholder, cursorSpacing: cursorSpacing, maxlength: maxLength, autoFocus: autoFocus }, (focus ? { focus } : {}), { value: value, confirmType: confirmType, cursor: cursor, selectionStart: selectionStart, selectionEnd: selectionEnd, adjustPosition: adjustPosition, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur, onConfirm: this.handleConfirm, onKeyboardHeightChange: this.handleKeyboardHeightChange })),
                clear && value && (React.createElement(View, { className: 'at-input__icon', onTouchEnd: this.handleClearValue },
                    React.createElement(Text, { className: 'at-icon at-icon-close-circle at-input__icon-close' }))),
                error && (React.createElement(View, { className: 'at-input__icon', onTouchStart: this.handleErrorClick },
                    React.createElement(Text, { className: 'at-icon at-icon-alert-circle at-input__icon-alert' }))),
                React.createElement(View, { className: 'at-input__children' }, this.props.children))));
    }
}
AtInput.defaultProps = {
    className: '',
    customStyle: '',
    value: '',
    name: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: '',
    title: '',
    cursorSpacing: 50,
    confirmType: 'done',
    cursor: 0,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    maxlength: 140,
    maxLength: 140,
    type: 'text',
    disabled: false,
    border: true,
    editable: true,
    error: false,
    clear: false,
    autoFocus: false,
    focus: false,
    required: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => { }
};
AtInput.propTypes = {
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderStyle: PropTypes.string,
    placeholderClass: PropTypes.string,
    title: PropTypes.string,
    confirmType: PropTypes.string,
    cursor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectionStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectionEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    adjustPosition: PropTypes.bool,
    cursorSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    disabled: PropTypes.bool,
    border: PropTypes.bool,
    editable: PropTypes.bool,
    error: PropTypes.bool,
    clear: PropTypes.bool,
    autoFocus: PropTypes.bool,
    focus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onConfirm: PropTypes.func,
    onErrorClick: PropTypes.func,
    onClick: PropTypes.func,
    required: PropTypes.bool
};
//# sourceMappingURL=index.js.map