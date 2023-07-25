import {Tabs, TabsProps} from 'antd'
import { AllService } from './AllServices'
import { PaidService } from './PaidService'
import { UnpaidService } from './NonPaidService'

const Service = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `All services`,
      children: <AllService/>,
    },
    {
      key: '2',
      label: `Paid services`,
      children: <PaidService/>,
    },
    {
      key: '3',
      label: `Non-paid services`,
      children: <UnpaidService/>,
    },
  ]
  return (
    <div>
      <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export {Service}
