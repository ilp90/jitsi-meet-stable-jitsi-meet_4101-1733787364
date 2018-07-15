// @flow

import { BaseApp } from '../../../base/app';

import { incomingCallReceived } from '../actions';

import IncomingCallPage from './IncomingCallPage';

type Props = {

    /**
     * URL of the avatar for the caller.
     */
    callerAvatarUrl: string,

    /**
     * Name of the caller.
     */
    callerName: string,

    /**
     * Whether this is a video call or not.
     */
    hasVideo: boolean
};

/**
 * Root application component for incoming call.
 *
 * @extends BaseApp
 */
export default class IncomingCallApp extends BaseApp<Props> {
    _init: Promise<*>;

    /**
     * Navigates to {@link IncomingCallPage} upon mount.
     *
     * NOTE: This was implmented here instead of in a middleware for
     * the APP_WILL_MOUNT action because that would run also for {@link App}.
     *
     * @returns {void}
     */
    componentWillMount() {
        super.componentWillMount();

        this._init.then(() => {
            const { dispatch } = this.state.store;
            const {
                callerAvatarUrl: avatarUrl,
                callerName: name,
                hasVideo
            } = this.props;

            dispatch(incomingCallReceived({
                avatarUrl,
                name,
                hasVideo
            }));

            super._navigate({ component: IncomingCallPage });
        });
    }
}