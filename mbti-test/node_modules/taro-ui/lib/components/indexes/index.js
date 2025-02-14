import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { delayQuerySelector, isTest, pxTransform, uuid } from '../../common/utils';
import AtList from '../list/index';
import AtListItem from '../list/item/index';
import AtToast from '../toast/index';
const ENV = Taro.getEnv();
export default class AtIndexes extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = (item) => {
            this.props.onClick && this.props.onClick(item);
        };
        this.handleTouchMove = (event) => {
            event.stopPropagation();
            event.preventDefault();
            const { list } = this.props;
            const pageY = event.touches[0].pageY;
            const index = Math.floor((pageY - this.startTop) / this.itemHeight);
            if (index >= 0 && index <= list.length && this.currentIndex !== index) {
                this.currentIndex = index;
                const key = index > 0 ? list[index - 1].key : 'top';
                const touchView = `at-indexes__list-${key}`;
                this.jumpTarget(touchView, index);
            }
        };
        this.handleTouchEnd = () => {
            this.currentIndex = -1;
        };
        this.state = {
            _scrollIntoView: '',
            _scrollTop: 0,
            _tipText: '',
            _isShowToast: false,
            isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
            currentIndex: -1
        };
        // 右侧导航高度
        this.menuHeight = 0;
        // 右侧导航距离顶部高度
        this.startTop = 0;
        // 右侧导航元素高度
        this.itemHeight = 0;
        // 当前索引
        this.currentIndex = -1;
        this.listId = isTest() ? 'indexes-list-AOTU2018' : `list-${uuid()}`;
        this.indexMap = [];
    }
    jumpTarget(_scrollIntoView, idx) {
        const { topKey = 'Top', list } = this.props;
        const _tipText = idx === 0 ? topKey : list[idx - 1].key;
        if (ENV === Taro.ENV_TYPE.WEB) {
            delayQuerySelector('.at-indexes', 0).then(rect => {
                const targetOffsetTop = this.listRef.children[idx].offsetTop;
                const _scrollTop = targetOffsetTop - rect[0].top;
                this.updateState({
                    _scrollTop,
                    _scrollIntoView,
                    _tipText
                });
            });
            return;
        }
        this.updateState({
            _scrollIntoView,
            _tipText
        });
    }
    __jumpTarget(key) {
        const { list } = this.props;
        // const index = _findIndex(list, ['key', key])
        const index = list.findIndex(item => item.key === key);
        const targetView = `at-indexes__list-${key}`;
        this.jumpTarget(targetView, index + 1);
    }
    updateState(state) {
        const { isShowToast, isVibrate } = this.props;
        const { _scrollIntoView, _tipText, _scrollTop } = state;
        // TODO: Fix dirty hack
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        this.setState({
            _scrollIntoView: _scrollIntoView,
            _tipText: _tipText,
            _scrollTop: _scrollTop,
            _isShowToast: isShowToast
        }, 
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
        () => {
            clearTimeout(this.timeoutTimer);
            this.timeoutTimer = setTimeout(() => {
                this.setState({
                    _tipText: '',
                    _isShowToast: false
                });
            }, 3000);
        });
        if (isVibrate) {
            Taro.vibrateShort();
        }
    }
    async initData() {
        var _a, _b, _c, _d;
        delayQuerySelector('.at-indexes__menu').then(rect => {
            const len = this.props.list.length;
            this.menuHeight = rect[0].height;
            this.startTop = rect[0].top;
            this.itemHeight = Math.floor(this.menuHeight / (len + 1));
        });
        const headerHeight = ((_b = (_a = (await delayQuerySelector('#at-indexes__top'))) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.height) || 0;
        const itemHeight = ((_c = (await delayQuerySelector('.at-list__item'))) === null || _c === void 0 ? void 0 : _c[0].height) || 0;
        const titleHeight = ((_d = (await delayQuerySelector('.at-indexes__list-title'))) === null || _d === void 0 ? void 0 : _d[0].height) || 0;
        this.indexMap = [];
        this.props.list.forEach((dataList, i) => {
            if (i === 0) {
                this.indexMap.push({
                    key: dataList.key,
                    startHeight: headerHeight,
                    endHeight: dataList.items.length * itemHeight + headerHeight + titleHeight
                });
            }
            else {
                const prev = this.indexMap[i - 1];
                this.indexMap.push({
                    key: dataList.key,
                    startHeight: prev.endHeight,
                    endHeight: prev.endHeight + dataList.items.length * itemHeight + titleHeight
                });
            }
        });
    }
    handleScroll(e) {
        if (e && e.detail) {
            const scrollTop = e.detail.scrollTop;
            this.setState({
                _scrollTop: scrollTop
            });
            this.getAnchorIndex(scrollTop);
        }
    }
    // 根据滚动高度，判断当前应该显示的索引值
    getAnchorIndex(scrollTop) {
        const index = this.indexMap.findIndex(item => {
            return scrollTop >= item.startHeight && scrollTop < item.endHeight;
        });
        this.setState({
            currentIndex: index
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.list.length !== this.props.list.length) {
            this.initData();
        }
    }
    componentDidMount() {
        if (ENV === Taro.ENV_TYPE.WEB) {
            this.listRef = document.getElementById(this.listId);
        }
        this.initData();
    }
    UNSAFE_componentWillMount() {
        this.props.onScrollIntoView &&
            this.props.onScrollIntoView(this.__jumpTarget.bind(this));
    }
    render() {
        const { className, customStyle, animation, topKey, list } = this.props;
        const { _scrollTop, _scrollIntoView, _tipText, _isShowToast, isWEB, currentIndex } = this.state;
        const toastStyle = { minWidth: pxTransform(100) };
        const rootCls = classNames('at-indexes', className);
        const menuList = list.map((dataList, i) => {
            const { key } = dataList;
            const targetView = `at-indexes__list-${key}`;
            return (React.createElement(View, { className: classNames('at-indexes__menu-item', {
                    'at-indexes__menu-item--active': currentIndex === i
                }), key: key, onClick: this.jumpTarget.bind(this, targetView, i + 1) }, key));
        });
        const indexesList = list.map(dataList => (React.createElement(View, { id: `at-indexes__list-${dataList.key}`, className: 'at-indexes__list', key: dataList.key },
            React.createElement(View, { className: 'at-indexes__list-title' }, dataList.title),
            React.createElement(AtList, null, dataList.items &&
                dataList.items.map(item => (React.createElement(AtListItem, { key: item.name, title: item.name, onClick: this.handleClick.bind(this, item) })))))));
        return (React.createElement(View, { className: rootCls, style: customStyle },
            React.createElement(AtToast, { customStyle: toastStyle, isOpened: _isShowToast, text: _tipText, duration: 2000 }),
            React.createElement(View, { className: 'at-indexes__menu', onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd },
                React.createElement(View, { className: 'at-indexes__menu-item', onClick: this.jumpTarget.bind(this, 'at-indexes__top', 0) }, topKey),
                menuList),
            React.createElement(ScrollView, { className: 'at-indexes__body', id: this.listId, scrollY: true, scrollWithAnimation: animation, 
                // eslint-disable-next-line no-undefined
                scrollTop: isWEB ? _scrollTop : undefined, scrollIntoView: !isWEB ? _scrollIntoView : '', onScroll: this.handleScroll.bind(this) },
                React.createElement(View, { className: 'at-indexes__content', id: 'at-indexes__top' }, this.props.children),
                indexesList)));
    }
}
AtIndexes.propTypes = {
    customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    animation: PropTypes.bool,
    isVibrate: PropTypes.bool,
    isShowToast: PropTypes.bool,
    topKey: PropTypes.string,
    list: PropTypes.array,
    onClick: PropTypes.func,
    onScrollIntoView: PropTypes.func
};
AtIndexes.defaultProps = {
    customStyle: '',
    className: '',
    animation: false,
    topKey: 'Top',
    isVibrate: true,
    isShowToast: true,
    list: []
};
//# sourceMappingURL=index.js.map