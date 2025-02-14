import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Taro from '@tarojs/taro';
import { Text, View, MovableArea, MovableView } from '@tarojs/components';
import { uuid, delayGetClientRect } from '../../common/utils';
import AtSwipeActionOptions from './options/index';
export default class AtSwipeAction extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpened = (event) => {
            const { onOpened } = this.props;
            if (typeof onOpened === 'function') {
                onOpened(event);
            }
        };
        this.handleClosed = (event) => {
            const { onClosed } = this.props;
            if (typeof onClosed === 'function') {
                onClosed(event);
            }
        };
        this.handleClick = (item, index, event) => {
            const { onClick, autoClose } = this.props;
            if (typeof onClick === 'function') {
                onClick(item, index, event);
            }
            if (autoClose) {
                this._reset(false); // TODO: Check behavior
                this.handleClosed(event);
            }
        };
        this.onTouchEnd = e => {
            const { maxOffsetSize } = this.state;
            if (Math.abs(this.moveX) < maxOffsetSize / 2) {
                this._reset(false);
                this.handleClosed(e);
            }
            else {
                this._reset(true);
                this.handleOpened(e);
            }
        };
        this.onChange = e => {
            this.moveX = e.detail.x;
        };
        const { isOpened } = props;
        this.state = {
            componentId: uuid(),
            // eslint-disable-next-line no-extra-boolean-cast
            offsetSize: 0,
            _isOpened: !!isOpened,
            needAnimation: false,
            eleWidth: 0,
            maxOffsetSize: 0
        };
        this.moveX = this.state.offsetSize;
    }
    componentDidMount() {
        this.getAreaWidth();
    }
    // 当 eleWidth 发生变化时，需要重新计算 maxOffsetSize
    componentDidUpdate(_, prevState) {
        const { eleWidth } = this.state;
        if (prevState.eleWidth !== eleWidth) {
            this.getMaxOffsetSize();
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isOpened } = nextProps;
        const { _isOpened, maxOffsetSize } = this.state;
        if (isOpened !== _isOpened) {
            this.moveX = isOpened ? 0 : maxOffsetSize;
            this._reset(!!isOpened); // TODO: Check behavior
        }
    }
    /**
     * 获取滑动区域宽度
     */
    async getAreaWidth() {
        const systemInfo = await Taro.getSystemInfo();
        this.setState({
            eleWidth: systemInfo.windowWidth
        });
    }
    /**
     * 获取最大偏移量
     */
    async getMaxOffsetSize() {
        const { componentId } = this.state;
        const actionOptionsRect = await delayGetClientRect({
            selectorStr: `#swipeActionOptions-${componentId}`
        });
        const maxOffsetSize = actionOptionsRect[0].width;
        this.setState({
            maxOffsetSize
        });
    }
    _reset(isOpened) {
        if (isOpened) {
            const { maxOffsetSize } = this.state;
            if (process.env.TARO_ENV === 'jd') {
                this.setState({
                    _isOpened: true,
                    offsetSize: -maxOffsetSize + 0.01
                });
            }
            else {
                this.setState({
                    _isOpened: true,
                    offsetSize: -maxOffsetSize
                });
            }
        }
        else {
            this.setState({
                offsetSize: this.moveX
            }, () => {
                this.setState({
                    offsetSize: 0,
                    _isOpened: false
                });
            });
        }
    }
    render() {
        const { componentId, maxOffsetSize, eleWidth, offsetSize } = this.state;
        const { options, disabled } = this.props;
        const rootClass = classNames('at-swipe-action', this.props.className);
        return (React.createElement(View, { id: `swipeAction-${componentId}`, className: rootClass, style: {
                width: `${eleWidth}px`
            } },
            React.createElement(MovableArea, { className: 'at-swipe-action__area', style: {
                    width: `${eleWidth}px`
                } },
                React.createElement(MovableView, { className: 'at-swipe-action__content', direction: 'horizontal', damping: 50, x: offsetSize, onTouchEnd: this.onTouchEnd, onChange: this.onChange, disabled: disabled, style: {
                        width: `${eleWidth + maxOffsetSize}px`
                    } },
                    this.props.children,
                    Array.isArray(options) && options.length > 0 ? (React.createElement(AtSwipeActionOptions, { options: options, componentId: componentId, customStyle: {
                            opacity: maxOffsetSize ? 1 : 0
                        } }, options.map((item, key) => (React.createElement(View, { key: `${item.text}-${key}`, style: item.style, onClick: (e) => this.handleClick(item, key, e), className: classNames('at-swipe-action__option', item.className) },
                        React.createElement(Text, { className: 'option__text' }, item.text)))))) : null))));
    }
}
AtSwipeAction.defaultProps = {
    options: [],
    isOpened: false,
    disabled: false,
    autoClose: false,
    maxDistance: 0,
    areaWidth: 0
};
AtSwipeAction.propTypes = {
    isOpened: PropTypes.bool,
    disabled: PropTypes.bool,
    autoClose: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        className: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.array
        ])
    })),
    onClick: PropTypes.func,
    onOpened: PropTypes.func,
    onClosed: PropTypes.func
};
//# sourceMappingURL=index.js.map