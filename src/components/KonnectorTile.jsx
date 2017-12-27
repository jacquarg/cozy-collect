import styles from '../styles/konnectorTile'

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router'
import { translate } from 'cozy-ui/react/I18n'
import { CONNECTION_STATUS } from '../lib/CollectStore'
import { getAccountName } from '../lib/helpers'
import { getKonnectorIcon } from '../lib/icons'

import { getConnectionStatus, getKonnectorConnectedAccount } from '../reducers'

const KonnectorTile = ({
  account,
  displayAccount,
  konnector,
  status,
  router,
  t
}) => {
  const { category, name, slug } = konnector
  const accountSegment = account ? `/${account._id}` : ''
  return (
    <Link
      className="item-wrapper"
      to={`${router.location.pathname}/${slug}${accountSegment}`}
    >
      <header className="item-header">
        <img
          className="item-icon"
          alt={t('connector.logo.alt', { name })}
          src={getKonnectorIcon(konnector)}
        />
      </header>
      <h3 className="item-title">{name}</h3>
      {!displayAccount &&
        category && (
          <p className="item-subtitle">{t(`category.${category}`)}</p>
        )}
      {displayAccount &&
        account && <p className="item-subtitle">{getAccountName(account)}</p>}
      {status && stateIcon(status)}
    </Link>
  )
}

const svgIcon = name => (
  <svg className="item-status-icon">
    <use xlinkHref={require(`../assets/sprites/icon-${name}.svg`)} /> }
  </svg>
)

const stateIcon = status => {
  switch (status) {
    case CONNECTION_STATUS.ERRORED:
      return svgIcon('warning')
    case CONNECTION_STATUS.CONNECTED:
      return svgIcon('check')
    case CONNECTION_STATUS.RUNNING:
      return <span className={styles['col-konnector-status-running']} />
    default:
      return null
  }
}

const mapStateToProps = (state, props) => ({
  status: getConnectionStatus(state, props.konnector),
  account: getKonnectorConnectedAccount(state, props.konnector)
})

export default connect(mapStateToProps)(translate()(withRouter(KonnectorTile)))
