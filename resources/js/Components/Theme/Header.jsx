import { AlignLeftIcon, BellDotIcon, BellIcon, ChevronDownIcon, GripIcon, LanguagesIcon, LogOutIcon, MessageSquareTextIcon, SearchIcon, Settings2Icon, SunIcon, User2Icon } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from '../Ui/dropdown-menu'
import { Link } from '@inertiajs/react'

export default function Header() {
    return (
        <header className='main-header'>
            <div className="header-wrapper">
                <div className="left-item">
                    <div className="toggle-section">
                        <AlignLeftIcon color='gray'/>
                    </div>
                    <div className="search-section">
                        <div className="input-wrapper">
                            <input type="text" placeholder='Search...' />
                            <span className='icon'><SearchIcon color='gray' strokeWidth={1.5} /></span>
                        </div>
                    </div>
                </div>
                <div className="right-item">
                    <div className="notification-section">
                        <BellIcon color='gray' />
                    </div>
                    <div className="message-section">
                        <MessageSquareTextIcon color='gray' />
                    </div>
                    <div className="divider"></div>
                    <div className="language-section">
                        <LanguagesIcon color='gray' />
                    </div>
                    <div className="mode-section">
                        <SunIcon color='gray' />
                    </div>
                    <div className="divider"></div>
                    <div className="user-section">
                        <div className="avatar-wrapper">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className='flex items-center gap-1 justify-between'>
                                        <img src="/assets/images/avatar/2.jpg" alt="user avatar" />
                                        <ChevronDownIcon color='gray' size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="user-dropdown-menu">
                                    <Link href={route('profile.edit')}>
                                        <DropdownMenuItem>
                                            <User2Icon className="mr-2 h-4 w-4" />
                                            <span>My Account</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link>
                                        <DropdownMenuItem>
                                            <Settings2Icon className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={route('logout')} method="post" as="button" className='w-full'>
                                        <DropdownMenuItem>
                                            <LogOutIcon className="mr-2 h-4 w-4" />
                                            <span>Log Out</span>
                                        </DropdownMenuItem>
                                    </Link>

                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className='app-section'>
                        <GripIcon color='gray' />
                    </div>
                </div>
            </div>
        </header>
    )
}
