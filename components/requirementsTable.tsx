import { Fragment, useState } from 'react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function RequirementsTable() {
    const [tokenGroups, setTokenGroups] = useState([
        {
          type: 'ERC-20',
          tokens: [
            { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', amount: '20', ids: [] },
            { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', amount: '50', ids: [] },
          ],
        },
        {
          type: 'ERC-721',
          tokens: [
            { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', amount: '20', ids: [1, 2, 3] },
            { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', amount: '50', ids: [4, 5, 6] },
          ],
        },
        {
          type: 'ERC-1155',
          tokens: [
            { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', amount: '20', ids: [1, 2, 3] },
            { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', amount: '50', ids: [4, 5, 6] },
          ],
        },
    ]);

    const removeToken = (type: string, idx: number) => {
        setTokenGroups(tokenGroups.map((tokenGroup: any) => {
            if (tokenGroup.type === type) {
                tokenGroup.tokens = tokenGroup.tokens.filter((_: any, tIndex: number) => tIndex !== idx);
                return tokenGroup;
            }
            return tokenGroup;
        }))
    }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
        <h2 className="text-2xl font-semibold text-white">Setup token requirements</h2>
          <p className="mt-2 text-sm text-gray-400">
            Add ERC-20, ERC-721 or ERC-1155 token requirements for your repository.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add requirement
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ids
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {tokenGroups.map((tokenGroup) => (
                    <Fragment key={tokenGroup.type}>
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={5}
                          scope="colgroup"
                          className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                        >
                          {tokenGroup.type}
                        </th>
                      </tr>
                      {tokenGroup.tokens.map((token, tokenIdx) => (
                        <tr
                          key={tokenIdx}
                          className={classNames(tokenIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {token.address}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{token.amount}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{token.ids.join(',')}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => removeToken(tokenGroup.type, tokenIdx)}>
                              Delete<span className="sr-only">, {token.address}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
