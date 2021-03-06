<template lang='pug'>
  #app(data-app='true')
    router-view
    modal-manager
    privacy-policy-modal(:showModal='showPrivacyPolicyModal' :isUpdatedVersion='isUpdatedPrivacyPolicyVersion' :onAccept='privacyPolicyAccepted')
    
</template>

<script>
  // import AutoUpdater from '@common/services/AutoUpdater'
  import ModalManager from '@common/widgets/ModalManager'
  import PrivacyPolicyModal from '@common/widgets/PrivacyPolicyModal'
  import { showConfirmDialog } from '@common/utils'
  import config from '@utils/config'

  import { getService } from '@utils/remote'

  const AutoUpdater = getService('autoupdate')
  const privacyPolicyService = getService('privacy-policy')

  export default {
    data () {
      return {
        showPrivacyPolicyModal: false,
        isUpdatedPrivacyPolicyVersion: false
      }
    },
    components: {
      ModalManager,
      PrivacyPolicyModal
    },
    created () {
    },
    mounted () {
      this.checkPrivacyPolicy()
    },
    methods: {
      async checkForUpdate () {
        AutoUpdater.checkForUpdates()
        .then(updateAvailable => {
          if (!updateAvailable) {
            return false
          }

          return showConfirmDialog(
            'Update Available',
            'An update is available, would you like to update?',
            { yesText: 'Update', noText: 'No'}
          )
        })
        .then(shouldUpdate => shouldUpdate ? this.downloadUpdate() : null)

        setInterval(() => this.checkForUpdate(), 1000 * 60 * 60)
      },
      async checkPrivacyPolicy () {
        const notificationRequired = await privacyPolicyService.isPrivacyPolicyNotificationRequired()

        this.showPrivacyPolicyModal = notificationRequired > 0
        this.isUpdatedPrivacyPolicyVersion = notificationRequired === 2

        if (!notificationRequired) {
          this.checkForUpdate()
        }
      },
      privacyPolicyAccepted () {
        this.showPrivacyPolicyModal = false
        privacyPolicyService.privacyPolicyAccepted()
      },
      downloadUpdate () {
        AutoUpdater.downloadUpdate()
        .then(() => showConfirmDialog(
          'Application Restart Needed',
          'Application will now restart for update to take effect',
          { yesText: 'OK', noText: 'Cancel'}
        ))
        .then(() => AutoUpdater.quitAndInstall())
      }
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  @import url(https://fonts.googleapis.com/css?family=Alegreya+Sans+SC);



  html,
  body { 
    height: 100%; 
  }
  #app {
    height: 100%;
  }
</style>
