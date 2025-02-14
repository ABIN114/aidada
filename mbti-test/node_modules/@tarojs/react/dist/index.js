'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@tarojs/shared');
var runtime = require('@tarojs/runtime');
var Reconciler = require('react-reconciler');
var constants = require('react-reconciler/constants');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Reconciler__default = /*#__PURE__*/_interopDefaultLegacy(Reconciler);

var supportedInputTypes = {
    color: true,
    date: true,
    datetime: true,
    'datetime-local': true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
};
var SyncLane = 1;
var InputContinuousLane = 4;
var DefaultLane = 16;
var DiscreteEventPriority = SyncLane;
var ContinuousEventPriority = InputContinuousLane;
var DefaultEventPriority = DefaultLane;
function getEventPriority(domEventName) {
    switch (domEventName) {
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'input':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case 'pointerdown':
        case 'pointerup':
        case 'reset':
        case 'resize':
        case 'submit':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'change':
        case 'blur':
        case 'focus':
        case 'select':
        case 'selectstart':
            return DiscreteEventPriority;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case 'dragleave':
        case 'dragover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'toggle':
        case 'touchmove':
        case 'pointerenter':
        case 'pointerleave':
            return ContinuousEventPriority;
        default:
            return DefaultEventPriority;
    }
}
var randomKey = Math.random()
    .toString(36)
    .slice(2);
var internalPropsKey = '__reactProps$' + randomKey;
var internalInstanceKey = '__reactFiber$' + randomKey;
var internalContainerInstanceKey = '__reactContainer$' + randomKey;
// const internalEventHandlersKey = '__reactEvents$' + randomKey
// const internalEventHandlerListenersKey = '__reactListeners$' + randomKey
// const internalEventHandlesSetKey = '__reactHandles$' + randomKey

var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostComponent = 5;
var HostText = 6;
var SuspenseComponent = 13;

/**
 * 给 TaroElement 绑定 react fiber、react props 等属性
 * 提供 fiber -> element、element -> fiber、element -> props 的方法
*/
function precacheFiberNode(hostInst, node) {
    node[internalInstanceKey] = hostInst;
}
function markContainerAsRoot(hostRoot, node) {
    node[internalContainerInstanceKey] = hostRoot;
}
/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode(node) {
    var inst = node[internalInstanceKey] || node[internalContainerInstanceKey];
    if (inst) {
        if (inst.tag === HostComponent ||
            inst.tag === HostText ||
            inst.tag === SuspenseComponent ||
            inst.tag === HostRoot) {
            return inst;
        }
        else {
            return null;
        }
    }
    return null;
}
/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance(inst) {
    if (inst.tag === HostComponent || inst.tag === HostText) {
        // In Fiber this, is just the state node right now. We assume it will be
        // a host component or host text.
        return inst.stateNode;
    }
}
function getFiberCurrentPropsFromNode(node) {
    return node[internalPropsKey] || null;
}
function updateFiberProps(node, props) {
    node[internalPropsKey] = props;
}

// 从 props 中，更新 input 组件的 value 值
function updateInputWrapper(element, oldValue, props) {
    var node = element;
    var checked = props.checked;
    if (checked != null) {
        console.warn('updateCheck 未实现', node);
        return;
    }
    updateWrapper(element, oldValue, props);
    updateNamedCousins(element, props);
}
// react 中原本处理 type=radio 的逻辑，这里留个空，暂时不处理
function updateNamedCousins(rootNode, props) {
    var name = props.name;
    if (props.type === 'radio' && name != null) {
        console.warn('radio updateNamedCousins 未实现', rootNode, props);
    }
}
function getToStringValue(value) {
    var isEmptyType = typeof value === 'function' || typeof value === 'symbol';
    return isEmptyType ? '' : value;
}
function toString(value) {
    return '' + value;
}
function updateWrapper(element, oldValue, props) {
    var node = element;
    var value = getToStringValue(props.value);
    var type = props.type;
    setNodeValue(node, oldValue, value, type);
}
// oldValue 为 event.detail.value，value 为 fiber.props.value
// 如果 oldValue 和 value 不相等，代表受控组件需要更新
// 更新的原则为，fiber.props.value 永远为用户所需要的值，因此 node.value = toString(value)
function setNodeValue(node, oldValue, value, type) {
    if ( type === void 0 ) type = 'string';

    if (value != null) {
        if (type === 'number') {
            if ((value === 0 && node.value === '') ||
                // We explicitly want to coerce to number here if possible.
                // eslint-disable-next-line
                oldValue != value) {
                node.value = toString(value);
            }
        }
        else if (oldValue !== toString(value)) {
            node.value = toString(value);
        }
    }
    else if (type === 'submit' || type === 'reset') {
        // Submit/reset inputs need the attribute removed completely to avoid
        // blank-text buttons.
        node.removeAttribute('value');
    }
}
// 判断当前 TaroElement 是否为 supportedInputTypes input 或 textarea
function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    if (nodeName === 'input') {
        var type = elem.type;
        return !type || !!supportedInputTypes[type];
    }
    if (nodeName === 'textarea') {
        return true;
    }
    return false;
}
var ReactDOMTextareaRestoreControlledState = updateWrapper;
var ReactDOMInputRestoreControlledState = updateInputWrapper;

function isCheckable(elem) {
    var type = elem.type;
    var nodeName = elem.nodeName;
    return (nodeName &&
        nodeName.toLowerCase() === 'input' &&
        (type === 'checkbox' || type === 'radio'));
}
function getTracker(node) {
    return node._valueTracker;
}
function detachTracker(node) {
    node._valueTracker = null;
}
// 之所以单独创建一个 tacker，是为了统一监听不同 type 的 input 值
// 比如 type=checkbox 或者 type=radio，就需要监听 checked，而不是 value
// 虽然目前还未实现 checkbox 和 radio 的 finishEventHandle，但后续不好说，所以先统一和 react 一样的写法
// 需要特别注意的是，tracker 初始化时的值为 node 的初始值，但后续会变更为事件的 detail.value 值
function trackValueOnNode(node) {
    var valueField = isCheckable(node) ? 'checked' : 'value';
    var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
    var currentValue = '' + node[valueField];
    if (node.hasOwnProperty(valueField) ||
        typeof descriptor === 'undefined' ||
        typeof descriptor.get !== 'function' ||
        typeof descriptor.set !== 'function') {
        return;
    }
    var get = descriptor.get;
    var set = descriptor.set;
    Object.defineProperty(node, valueField, {
        configurable: true,
        enumerable: descriptor.enumerable,
        get: function () {
            return get.call(this);
        },
        set: function (value) {
            currentValue = '' + value;
            set.call(this, value);
        },
    });
    var tracker = {
        getValue: function getValue() {
            return currentValue;
        },
        setValue: function setValue(value) {
            currentValue = '' + value;
        },
        stopTracking: function stopTracking() {
            detachTracker(node);
            delete node[valueField];
        },
    };
    return tracker;
}
function track(node) {
    if (getTracker(node)) {
        return;
    }
    node._valueTracker = trackValueOnNode(node);
}
function updateValueIfChanged(node, nextValue) {
    if (!node) {
        return false;
    }
    var tracker = getTracker(node);
    if (!tracker) {
        return true;
    }
    var lastValue = tracker.getValue();
    if (nextValue !== lastValue) {
        tracker.setValue(nextValue);
        return true;
    }
    return false;
}

function isEventName(s) {
    return s[0] === 'o' && s[1] === 'n';
}
var IS_NON_DIMENSIONAL = /aspect|acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function updateProps(dom, oldProps, newProps) {
    var updatePayload = getUpdatePayload(dom, oldProps, newProps);
    if (updatePayload) {
        updatePropsByPayload(dom, oldProps, updatePayload);
    }
}
function updatePropsByPayload(dom, oldProps, updatePayload) {
    for (var i = 0; i < updatePayload.length; i += 2) { // key, value 成对出现
        var key = updatePayload[i];
        var newProp = updatePayload[i + 1];
        var oldProp = oldProps[key];
        setProperty(dom, key, newProp, oldProp);
    }
}
function getUpdatePayload(dom, oldProps, newProps) {
    var i;
    var updatePayload = null;
    for (i in oldProps) {
        if (!(i in newProps)) {
            (updatePayload = updatePayload || []).push(i, null);
        }
    }
    var isFormElement = dom instanceof runtime.FormElement;
    for (i in newProps) {
        if (oldProps[i] !== newProps[i] || (isFormElement && i === 'value')) {
            (updatePayload = updatePayload || []).push(i, newProps[i]);
        }
    }
    return updatePayload;
}
// function eventProxy (e: CommonEvent) {
//   const el = document.getElementById(e.currentTarget.id)
//   const handlers = el!.__handlers[e.type]
//   handlers[0](e)
// }
function setEvent(dom, name, value, oldValue) {
    var isCapture = name.endsWith('Capture');
    var eventName = name.toLowerCase().slice(2);
    if (isCapture) {
        eventName = eventName.slice(0, -7);
    }
    var compName = shared.capitalize(shared.toCamelCase(dom.tagName.toLowerCase()));
    if (eventName === 'click' && compName in shared.internalComponents) {
        eventName = 'tap';
    }
    if (shared.isFunction(value)) {
        if (oldValue) {
            dom.removeEventListener(eventName, oldValue, false);
            dom.addEventListener(eventName, value, { isCapture: isCapture, sideEffect: false });
        }
        else {
            dom.addEventListener(eventName, value, isCapture);
        }
    }
    else {
        dom.removeEventListener(eventName, oldValue);
    }
}
function setStyle(style, key, value) {
    if (key[0] === '-') {
        style.setProperty(key, value.toString());
        // css variables need not further judgment
        return;
    }
    style[key] =
        shared.isNumber(value) && IS_NON_DIMENSIONAL.test(key) === false
            ? value + 'px'
            : value == null
                ? ''
                : value;
}
function setProperty(dom, name, value, oldValue) {
    var _a, _b;
    name = name === 'className' ? 'class' : name;
    if (name === 'key' ||
        name === 'children' ||
        name === 'ref') ;
    else if (name === 'style') {
        var style = dom.style;
        if (shared.isString(value)) {
            style.cssText = value;
        }
        else {
            if (shared.isString(oldValue)) {
                style.cssText = '';
                oldValue = null;
            }
            if (shared.isObject(oldValue)) {
                for (var i in oldValue) {
                    if (!(value && i in value)) {
                        setStyle(style, i, '');
                    }
                }
            }
            if (shared.isObject(value)) {
                for (var i$1 in value) {
                    if (!oldValue || value[i$1] !== oldValue[i$1]) {
                        setStyle(style, i$1, value[i$1]);
                    }
                }
            }
        }
    }
    else if (isEventName(name)) {
        setEvent(dom, name, value, oldValue);
    }
    else if (name === 'dangerouslySetInnerHTML') {
        var newHtml = (_a = value === null || value === void 0 ? void 0 : value.__html) !== null && _a !== void 0 ? _a : '';
        var oldHtml = (_b = oldValue === null || oldValue === void 0 ? void 0 : oldValue.__html) !== null && _b !== void 0 ? _b : '';
        if (newHtml || oldHtml) {
            if (oldHtml !== newHtml) {
                dom.innerHTML = newHtml;
            }
        }
    }
    else if (!shared.isFunction(value)) {
        if (value == null) {
            dom.removeAttribute(name);
        }
        else {
            dom.setAttribute(name, value);
        }
    }
}

/* eslint-disable @typescript-eslint/indent */
var hostConfig = {
    // below keys order by {React ReactFiberHostConfig.custom.js}, convenient for comparing each other.
    // -------------------
    // required by @types/react-reconciler
    // -------------------
    getPublicInstance: function getPublicInstance(inst) {
        return inst;
    },
    getRootHostContext: function getRootHostContext() {
        return {};
    },
    getChildHostContext: function getChildHostContext(parentHostContext) {
        return parentHostContext;
    },
    prepareForCommit: function prepareForCommit() {

        return null;
    },
    resetAfterCommit: shared.noop,
    createInstance: function createInstance(type, props, _rootContainerInstance, _hostContext, internalInstanceHandle) {
        var element = runtime.document.createElement(type);
        precacheFiberNode(internalInstanceHandle, element);
        updateFiberProps(element, props);
        return element;
    },
    appendInitialChild: function appendInitialChild(parent, child) {
        parent.appendChild(child);
    },
    finalizeInitialChildren: function finalizeInitialChildren(dom, type, props) {
        var obj;

        var newProps = props;
        if (dom instanceof runtime.FormElement) {
            var ref = ['switch', 'checkbox', 'radio'].includes(type) ? ['checked', 'defaultChecked'] : ['value', 'defaultValue'];
            var defaultName = ref[0];
            var defaultKey = ref[1];
            if (props.hasOwnProperty(defaultKey)) {
                newProps = Object.assign(Object.assign({}, newProps), ( obj = {}, obj[defaultName] = props[defaultKey], obj ));
                delete newProps[defaultKey];
            }
        }
        updateProps(dom, {}, newProps); // 提前执行更新属性操作，Taro 在 Page 初始化后会立即从 dom 读取必要信息
        if (type === 'input' || type === 'textarea') {
            track(dom);
        }
        return false;
    },
    prepareUpdate: function prepareUpdate(instance, _, oldProps, newProps) {
        return getUpdatePayload(instance, oldProps, newProps);
    },
    shouldSetTextContent: function shouldSetTextContent() {
        return false;
    },
    createTextInstance: function createTextInstance(text, _rootContainerInstance, _hostContext, internalInstanceHandle) {
        var textNode = runtime.document.createTextNode(text);
        precacheFiberNode(internalInstanceHandle, textNode);
        return textNode;
    },
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    isPrimaryRenderer: true,
    warnsIfNotActing: true,
    supportsMutation: true,
    supportsPersistence: false,
    supportsHydration: false,
    getInstanceFromNode: function () { return null; },
    beforeActiveInstanceBlur: shared.noop,
    afterActiveInstanceBlur: shared.noop,
    preparePortalMount: shared.noop,
    prepareScopeUpdate: shared.noop,
    getInstanceFromScope: function () { return null; },
    getCurrentEventPriority: function getCurrentEventPriority() {
        return constants.DefaultEventPriority;
    },
    detachDeletedInstance: shared.noop,
    // -------------------
    //      Microtasks
    //     (optional)
    // -------------------
    supportsMicrotasks: true,
    scheduleMicrotask: shared.isUndefined(Promise)
        ? setTimeout
        : function (callback) { return Promise.resolve(null)
            .then(callback)
            .catch(function (error) {
            setTimeout(function () {
                throw error;
            });
        }); },
    // -------------------
    //      Mutation
    //     (required if supportsMutation is true)
    // -------------------
    appendChild: function appendChild(parent, child) {
        parent.appendChild(child);
    },
    appendChildToContainer: function appendChildToContainer(parent, child) {
        parent.appendChild(child);
    },
    commitTextUpdate: function commitTextUpdate(textInst, _, newText) {
        textInst.nodeValue = newText;
    },
    commitMount: shared.noop,
    commitUpdate: function commitUpdate(dom, updatePayload, _, oldProps, newProps) {
        updatePropsByPayload(dom, oldProps, updatePayload);
        updateFiberProps(dom, newProps);
    },
    insertBefore: function insertBefore(parent, child, refChild) {
        parent.insertBefore(child, refChild);
    },
    insertInContainerBefore: function insertInContainerBefore(parent, child, refChild) {
        parent.insertBefore(child, refChild);
    },
    removeChild: function removeChild(parent, child) {
        parent.removeChild(child);
    },
    removeChildFromContainer: function removeChildFromContainer(parent, child) {
        parent.removeChild(child);
    },
    resetTextContent: shared.noop,
    hideInstance: function hideInstance(instance) {
        var style = instance.style;
        style.setProperty('display', 'none');
    },
    hideTextInstance: function hideTextInstance(textInstance) {
        textInstance.nodeValue = '';
    },
    unhideInstance: function unhideInstance(instance, props) {
        var styleProp = props.style;
        var display = (styleProp === null || styleProp === void 0 ? void 0 : styleProp.hasOwnProperty('display')) ? styleProp.display : null;
        display = display == null || shared.isBoolean(display) || display === '' ? '' : ('' + display).trim();
        // eslint-disable-next-line dot-notation
        instance.style['display'] = display;
    },
    unhideTextInstance: function unhideTextInstance(textInstance, text) {
        textInstance.nodeValue = text;
    },
    clearContainer: function clearContainer(element) {
        if (element.childNodes.length > 0) {
            element.textContent = '';
        }
    }
};
var TaroReconciler = Reconciler__default["default"](hostConfig);
if (process.env.NODE_ENV !== 'production') {
    var foundDevTools = TaroReconciler.injectIntoDevTools({
        bundleType: 1,
        version: '18.0.0',
        rendererPackageName: 'taro-react'
    });
    if (!foundDevTools) {
        // eslint-disable-next-line no-console
        console.info('%cDownload the React DevTools ' +
            'for a better development experience: ' +
            'https://reactjs.org/link/react-devtools', 'font-weight:bold');
    }
}

var restoreQueue = null;
// 对比 TaroElement tracker 下的 value 和事件下的 value，判断 element 的值是否存在更改
function getTargetInstForInputOrChangeEvent(e, node) {
    var _a, _b;
    var targetInst = getInstanceFromNode(node);
    var domEventName = e.type;
    if (!targetInst || !isTextInputElement(node))
        { return; }
    if (domEventName === 'input' || domEventName === 'change') {
        var nextValue = toString((_b = (_a = e.mpEvent) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.value);
        return getInstIfValueChanged(targetInst, nextValue);
    }
}
function getInstIfValueChanged(targetInst, nextValue) {
    var targetNode = getNodeFromInstance(targetInst);
    if (!targetNode)
        { return false; }
    if (updateValueIfChanged(targetNode, nextValue)) {
        return targetInst;
    }
}
// 把 target 塞入更新队列中
function enqueueStateRestore(target) {
    if (restoreQueue) {
        restoreQueue.push(target);
    }
    else {
        restoreQueue = [target];
    }
}
// 判断是否需要恢复 target（input、textarea） 的状态
function needsStateRestore() {
    return restoreQueue !== null;
}
function finishEventHandler() {
    var controlledComponentsHavePendingUpdates = needsStateRestore();
    if (controlledComponentsHavePendingUpdates) {
        TaroReconciler.flushSync();
        restoreStateIfNeeded();
    }
}
// 遍历 restoreQueue、restoreTarget，恢复其状态
function restoreStateIfNeeded() {
    if (!restoreQueue) {
        return;
    }
    var queuedTargets = restoreQueue;
    restoreQueue = null;
    for (var i = 0; i < queuedTargets.length; i++) {
        restoreStateOfTarget(queuedTargets[i]);
    }
}
function restoreImpl(domElement, tag, oldValue, props) {
    switch (tag) {
        case 'input':
            ReactDOMInputRestoreControlledState(domElement, oldValue, props);
            break;
        case 'textarea':
            ReactDOMTextareaRestoreControlledState(domElement, oldValue, props);
            break;
    }
}
function restoreStateOfTarget(item) {
    var internalInstance = getInstanceFromNode(item.target);
    if (!internalInstance)
        { return; }
    var stateNode = internalInstance.stateNode;
    var type = internalInstance.type;
    if (stateNode) {
        var props = getFiberCurrentPropsFromNode(stateNode);
        restoreImpl(stateNode, type, item.value, props);
    }
}

var ContainerMap = new WeakMap();
var Root = function Root(renderer, domContainer, options) {
    this.renderer = renderer;
    this.initInternalRoot(renderer, domContainer, options);
};
Root.prototype.initInternalRoot = function initInternalRoot (renderer, domContainer, options) {
    // Since react-reconciler v0.27, createContainer need more parameters
    // @see:https://github.com/facebook/react/blob/0b974418c9a56f6c560298560265dcf4b65784bc/packages/react-reconciler/src/ReactFiberReconciler.js#L248
    var containerInfo = domContainer;
    if (options) {
        var tag = 1; // ConcurrentRoot
        var concurrentUpdatesByDefaultOverride = false;
        var isStrictMode = false;
        var identifierPrefix = '';
        var onRecoverableError = function (error) { return console.error(error); };
        var transitionCallbacks = null;
        if (options.unstable_strictMode === true) {
            isStrictMode = true;
        }
        if (options.identifierPrefix !== undefined) {
            identifierPrefix = options.identifierPrefix;
        }
        if (options.onRecoverableError !== undefined) {
            onRecoverableError = options.onRecoverableError;
        }
        if (options.unstable_transitionCallbacks !== undefined) {
            transitionCallbacks = options.unstable_transitionCallbacks;
        }
        this.internalRoot = renderer.createContainer(containerInfo, tag, null, // hydrationCallbacks
        isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError, transitionCallbacks);
    }
    else {
        var tag$1 = 0; // LegacyRoot
        this.internalRoot = renderer.createContainer(containerInfo, tag$1, null, // hydrationCallbacks
        false, // isStrictMode
        false, // concurrentUpdatesByDefaultOverride,
        '', // identifierPrefix
        function () { }, // onRecoverableError, this isn't reachable because onRecoverableError isn't called in the legacy API.
        null // transitionCallbacks
        );
    }
};
Root.prototype.render = function render (children, cb) {
    var ref = this;
        var renderer = ref.renderer;
        var internalRoot = ref.internalRoot;
    renderer.updateContainer(children, internalRoot, null, cb);
    return renderer.getPublicRootInstance(internalRoot);
};
Root.prototype.unmount = function unmount (cb) {
    this.renderer.updateContainer(null, this.internalRoot, null, cb);
};
function render(element, domContainer, cb) {
    var oldRoot = ContainerMap.get(domContainer);
    if (oldRoot != null) {
        return oldRoot.render(element, cb);
    }
    var root = new Root(TaroReconciler, domContainer);
    ContainerMap.set(domContainer, root);
    return root.render(element, cb);
}
function createRoot(domContainer, options) {
    if ( options === void 0 ) options = {};

    var _a;
    var oldRoot = ContainerMap.get(domContainer);
    if (oldRoot != null) {
        return oldRoot;
    }
    // options should be an object
    var root = new Root(TaroReconciler, domContainer, options);
    ContainerMap.set(domContainer, root);
    markContainerAsRoot((_a = root === null || root === void 0 ? void 0 : root.internalRoot) === null || _a === void 0 ? void 0 : _a.current, domContainer);
    runtime.hooks.tap('dispatchTaroEvent', function (e, node) {
        var eventPriority = getEventPriority(e.type);
        TaroReconciler.runWithPriority(eventPriority, function () {
            node.dispatchEvent(e);
        });
    });
    // 对比 event.detail.value 和 node.tracker.value，判断 value 值是否有变动，存在变动则塞入队列中
    runtime.hooks.tap('modifyTaroEvent', function (e, node) {
        var _a, _b;
        var inst = getTargetInstForInputOrChangeEvent(e, node);
        if (!inst)
            { return; }
        // 这里塞入的是 event.detail.value，也就是事件的值，在受控组件中，你可以理解为需要被变更的值
        // 后续会在 finishEventHandler 中，使用最新的 fiber.props.value 来与其比较
        // 如果不一致，则表示需要更新，会执行 node.value = fiber.props.value 的更新操作
        var nextValue = (_b = (_a = e.mpEvent) === null || _a === void 0 ? void 0 : _a.detail) === null || _b === void 0 ? void 0 : _b.value;
        enqueueStateRestore({ target: node, value: nextValue });
    });
    return root;
}

var isInsideEventHandler = false;
// 重新包裹 batchedUpdates，使其可以在触发事件后执行 finishEventHandler
var unstable_batchedUpdates = function (fn, a) {
    if (isInsideEventHandler) {
        return fn(a);
    }
    isInsideEventHandler = true;
    try {
        return TaroReconciler.batchedUpdates(fn, a);
    }
    finally {
        isInsideEventHandler = false;
        finishEventHandler();
    }
};
function unmountComponentAtNode(dom) {
    shared.ensure(dom && [1, 8, 9, 11].includes(dom.nodeType), 'unmountComponentAtNode(...): Target container is not a DOM element.');
    var root = ContainerMap.get(dom);
    if (!root)
        { return false; }
    unstable_batchedUpdates(function () {
        root.unmount(function () {
            ContainerMap.delete(dom);
        });
    }, null);
    return true;
}
function findDOMNode(comp) {
    if (comp == null) {
        return null;
    }
    var nodeType = comp.nodeType;
    if (nodeType === 1 || nodeType === 3) {
        return comp;
    }
    return TaroReconciler.findHostInstance(comp);
}
var portalType = shared.isFunction(Symbol) && Symbol.for
    ? Symbol.for('react.portal')
    : 0xeaca;
function createPortal(children, containerInfo, key) {
    return {
        $$typeof: portalType,
        key: key == null ? null : String(key),
        children: children,
        containerInfo: containerInfo,
        implementation: null
    };
}
var index = {
    render: render,
    createRoot: createRoot,
    unstable_batchedUpdates: unstable_batchedUpdates,
    unmountComponentAtNode: unmountComponentAtNode,
    findDOMNode: findDOMNode,
    createPortal: createPortal
};

exports.createPortal = createPortal;
exports.createRoot = createRoot;
exports["default"] = index;
exports.findDOMNode = findDOMNode;
exports.render = render;
exports.unmountComponentAtNode = unmountComponentAtNode;
exports.unstable_batchedUpdates = unstable_batchedUpdates;
//# sourceMappingURL=index.js.map
