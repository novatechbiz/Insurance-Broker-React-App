import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  DocumentIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  LifebuoyIcon
} from '@heroicons/react/24/outline'

import DashboardsIcon from 'assets/dualicons/dashboards.svg?react'
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'

const ROOT_DASHBOARDS = '/dashboards'
const path = (root, item) => `${root}${item}`

export const dashboards = {
  id: 'dashboards',
  type: NAV_TYPE_ROOT,
  path: '/dashboards',
  title: 'InsureTech',
  transKey: 'nav.dashboards.dashboards',
  Icon: DashboardsIcon,
  childs: [
    {
      id: 'dashboards.home',
      path: path(ROOT_DASHBOARDS, '/home'),
      type: NAV_TYPE_ITEM,
      title: 'Home',
      transKey: 'nav.dashboards.home',
      Icon: HomeIcon
    },
    {
      id: 'dashboards.clients',
      path: path(ROOT_DASHBOARDS, '/clients'),
      type: NAV_TYPE_ITEM,
      title: 'Clients',
      transKey: 'nav.dashboards.clients',
      Icon: UsersIcon
    },
    {
      id: 'dashboards.brokers',
      path: path(ROOT_DASHBOARDS, '/brokers'),
      type: NAV_TYPE_ITEM,
      title: 'Brokers',
      transKey: 'nav.dashboards.brokers',
      Icon: BriefcaseIcon
    },
    {
      id: 'dashboards.reports',
      path: path(ROOT_DASHBOARDS, '/reports'),
      type: NAV_TYPE_ITEM,
      title: 'Reports',
      transKey: 'nav.dashboards.reports',
      Icon: DocumentIcon
    },
    {
      id: 'dashboards.policies',
      path: path(ROOT_DASHBOARDS, '/policies'),
      type: NAV_TYPE_ITEM,
      title: 'Policies',
      transKey: 'nav.dashboards.policies',
      Icon: ShieldCheckIcon
    },
    {
      id: 'dashboards.setting',
      path: path(ROOT_DASHBOARDS, '/setting'),
      type: NAV_TYPE_ITEM,
      title: 'Setting',
      transKey: 'nav.dashboards.setting',
      Icon: Cog6ToothIcon
    },
    {
      id: 'dashboards.support',
      path: path(ROOT_DASHBOARDS, '/support'),
      type: NAV_TYPE_ITEM,
      title: 'Support',
      transKey: 'nav.dashboards.support',
      Icon: LifebuoyIcon
    }
  ]
}
