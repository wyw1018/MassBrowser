import { PersistedState, RendererCachedState, RendererCachedPersistedState,
        fromConfig } from '@utils/store'

export default {
  state: {
    status: {
      type: 'none',
      message: '',
      progress: 0
    },
    sessions: [],
    syncProgress: 0,
    autoLaunchEnabled: new RendererCachedPersistedState(true),
    dockIconVisible: new RendererCachedPersistedState(false),
    bootComplete: new RendererCachedState(false),
    relay: new PersistedState({}),
    registrationComplete: new RendererCachedPersistedState(false),
    natEnabled: new RendererCachedPersistedState(fromConfig()),
    downloadLimit: new RendererCachedPersistedState(0),
    uploadLimit: new RendererCachedPersistedState(0),
    relayPort: new RendererCachedPersistedState(fromConfig('port')),
    openAccess: new RendererCachedPersistedState(true),
    latestAcceptedPrivacyPolicyVersion: new RendererCachedPersistedState(null),
    isRelayReachable: false,
    isServerConnected: false,
    publicAddress: {},
    privateAddress: {},
    publicPort: 0,
  },
  mutations: {
    setSyncProgress(state, progress) {
      state.syncProgress = progress
    },
    changeStatus(state, status) {
      state.status = status
    },
    clearStatus(state) {
      state.status = { type: 'none' }
    },
    registerRelay(state, relay) {
      state.relay = relay
      state.registrationComplete = true
    },
    completeBoot(state) {
      state.bootComplete = true
    },
    changeDownloadLimit(state, limit) {
      state.downloadLimit = limit
    },
    changeUploadLimit(state, limit) {
      state.uploadLimit = limit
    },
    changeNatStatus(state, natEnabled) {
      state.natEnabled = natEnabled
    },
    changeRelayPort(state, relayPort) {
      state.relayPort = relayPort
    },
    changeOpenAccess(state, openAccess) {
      state.openAccess = openAccess
    },
    changeRelayReachable(state, reachable) {
      state.isRelayReachable = reachable
    },
    changeServerConnected(state, connected) {
      state.isServerConnected = connected
    },
    setAutoLauncher(state, enabled) {
      state.autoLaunchEnabled = enabled
    },
    changePublicAddress(state, address) {
      state.publicAddress = address
    },
    changePrivateAddress(state, address) {
      state.privateAddress = address
    },
    changeDockIconVisible(state, visible) {
      state.dockIconVisible = visible
    },
    setLatestAcceptedPrivacyPolicyVersion(state, version) {
      state.latestAcceptedPrivacyPolicyVersion = version
    }
  }
}