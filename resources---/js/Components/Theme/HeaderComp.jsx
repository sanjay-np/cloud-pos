import { Link } from '@inertiajs/react';
import { AlignLeftIcon, BadgeIndianRupee, BellIcon, GripIcon, LanguagesIcon, MessageSquareTextIcon, PowerIcon, SearchIcon, SettingsIcon, SunIcon, User2Icon } from 'lucide-react'
import React from 'react'
import { Avatar, Badge, Divider, Dropdown, FlexboxGrid, HStack, IconButton, Input, InputGroup, Popover, Stack, Whisper } from 'rsuite'

export default function HeaderComp() {
    const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
        return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link href={route('profile.edit')}>
                            <div className="flex gap-3 text-gray-600 font-medium text-base items-center">
                                <User2Icon color='gray' size={18} /> <span> My Account</span>
                            </div>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div className="flex gap-3 text-gray-600 font-medium text-base items-center">
                            <SettingsIcon color='gray' size={18} /> <span> Settings</span>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link href={route('logout')} method="post" as="button">
                            <div className="flex gap-3 text-gray-600 font-medium text-base items-center">
                                <PowerIcon color='gray' size={18} /> <span> Log Out</span>
                            </div>
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Popover>
        );
    };

    return (
        <header className='header'>
            <FlexboxGrid align='middle' justify='space-between'>
                <FlexboxGrid.Item colSpan={12}>
                    <Stack spacing={6}>
                        <IconButton icon={<AlignLeftIcon size={26} strokeWidth={1.8} />} appearance='subtle' />
                        <div className="search-section">
                            <InputGroup inside >
                                <Input placeholder='Search...' />
                                <InputGroup.Button>
                                    <SearchIcon color='gray' strokeWidth={1.5} />
                                </InputGroup.Button>
                            </InputGroup>
                        </div>
                    </Stack>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colSpan={12}>
                    <Stack>
                        <HStack divider={<Divider vertical />} spacing={4}>
                            <Link href={route('pos.index')} className='no-underline hover:no-underline'>
                                <div className="flex items-center gap-2">
                                    <BadgeIndianRupee color='gray' size={20} />
                                    <span className='text-gray-600 font-medium text-base'>POS</span>
                                </div>
                            </Link>
                            <Stack spacing={20}>
                                <div className="notification-section">
                                    <Badge color='red' content={4}>
                                        <BellIcon color='gray' size={20} />
                                    </Badge>
                                </div>
                                <div className="message-section">
                                    <Badge color='red' content={4}>
                                        <MessageSquareTextIcon color='gray' size={20} />
                                    </Badge>
                                </div>
                            </Stack>
                            <Stack spacing={16}>
                                <div className="language-section"><LanguagesIcon color='gray' size={20} /></div>
                                <div className="mode-section"><SunIcon color='gray' size={20} /></div>
                            </Stack>
                            <Stack>
                                <Whisper placement="bottomEnd" trigger="click" speaker={renderSpeaker} place>
                                    <div className='relative'>
                                        <Avatar src='https://avatar.iran.liara.run/public/32' circle size='md' />
                                        <div className="absolute bottom-0 right-0">
                                            <Badge color='green' />
                                        </div>
                                    </div>
                                </Whisper>
                            </Stack>
                            <IconButton icon={<GripIcon size={26} strokeWidth={1.8} />} appearance='subtle' />
                        </HStack>
                    </Stack>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </header>
    )
}
