import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

const defaultRequirement = {
  type: 'ERC-20',
  address: '',
  amount: 0,
  ids: []
};

export default function NewRequirementSlide({ open, setOpen, submitRequirement }: { open: boolean, setOpen: (value: boolean) => void, submitRequirement: (value: any) => void }) {
    const [newRequirement, setNewRequirement] = useState<any>(defaultRequirement);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">New requirement</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Add a new requirement for your tokenized repo.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pt-6 pb-5">

                          <fieldset>
                              <legend className="text-sm font-medium text-gray-900">Token type</legend>
                              <div className="mt-2 space-x-5 flex items-center">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-5 items-center">
                                    <input
                                      id="ERC-20"
                                      name="ERC-20"
                                      aria-describedby="ERC-20-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      checked={newRequirement.type === 'ERC-20'}
                                      onChange={(event) => setNewRequirement({ ...newRequirement, type: event.target.id })}
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label htmlFor="ERC-20" className="font-medium text-gray-900">
                                      ERC-20
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-5 items-center">
                                      <input
                                        id="ERC-721"
                                        name="ERC-721"
                                        aria-describedby="ERC-721-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked={newRequirement.type === 'ERC-721'}
                                        onChange={(event) => setNewRequirement({ ...newRequirement, type: event.target.id })}
                                      />
                                    </div>
                                    <div className="pl-7 text-sm">
                                      <label htmlFor="ERC-721" className="font-medium text-gray-900">
                                        ERC-721
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-5 items-center">
                                      <input
                                        id="ERC-1155"
                                        name="ERC-1155"
                                        aria-describedby="ERC-1155-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        checked={newRequirement.type === 'ERC-1155'}
                                        onChange={(event) => setNewRequirement({ ...newRequirement, type: event.target.id })}
                                      />
                                    </div>
                                    <div className="pl-7 text-sm">
                                      <label htmlFor="ERC-1155" className="font-medium text-gray-900">
                                        ERC-1155
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          <div>
                            <label htmlFor="tokenAddress" className="block text-sm font-medium text-black">
                                Token address
                            </label>
                            <div className="mt-1">
                                <input
                                type="text"
                                name="tokenAddress"
                                id="tokenAddress"
                                className="block w-full text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="0x000000..."
                                aria-describedby="tokenAddress-description"
                                value={newRequirement.address}
                                onChange={(event) => setNewRequirement({ ...newRequirement, address: event.target.value })}
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500" id="tokenAddress-description">
                                Required token address.
                            </p>
                            </div>
                            <div>
                              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Token IDs
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="tokenIds"
                                  name="tokenIds"
                                  rows={4}
                                  className="block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  aria-describedby="tokenIds-description"
                                  value={newRequirement.ids.join(',')}
                                  onChange={(event) => setNewRequirement({ ...newRequirement, ids: event.target.value.split(',') })}
                                />
                                <p className="mt-2 text-sm text-gray-500" id="tokenIds-description">
                                    Comma separated values.
                                </p>
                              </div>
                            </div>
                          <div>
                            <label htmlFor="tokenAmount" className="block text-sm font-medium text-black">
                                Token amount
                            </label>
                            <div className="mt-1">
                                <input
                                type="number"
                                name="tokenAmount"
                                id="tokenAmount"
                                className="block w-full text-black bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                min={0}
                                aria-describedby="tokenAmount-description"
                                value={newRequirement.amount}
                                onChange={(event) => setNewRequirement({ ...newRequirement, amount: event.target.value})}
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500" id="tokenAmount-description">
                                Required token amount (most likely for ERC-20).
                            </p>
                            </div>
                          </div>
                          <div className="pt-4 pb-6">
                            <div className="flex text-sm">
                              <a href="#" className="group inline-flex items-center text-gray-500 hover:text-gray-900">
                                <QuestionMarkCircleIcon
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">Learn more about requirements</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { submitRequirement(newRequirement); setNewRequirement(defaultRequirement); setOpen(false); }}
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}