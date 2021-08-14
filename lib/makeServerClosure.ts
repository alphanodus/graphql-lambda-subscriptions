import { DataMapper } from '@aws/dynamodb-data-mapper'
import { ServerArgs, ServerClosure } from './types'
import { createModel } from './model/createModel'
import { Subscription } from './model/Subscription'
import { Connection } from './model/Connection'

export function makeServerClosure(opts: ServerArgs): ServerClosure {
  return {
    ...opts,
    model: {
      Subscription: createModel({
        model: Subscription,
        table: opts.tableNames?.subscriptions || 'subscriptionless_subscriptions',
      }),
      Connection: createModel({
        model: Connection,
        table: opts.tableNames?.connections || 'subscriptionless_connections',
      }),
    },
    mapper: new DataMapper({ client: opts.dynamodb }),
  }
}
