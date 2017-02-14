import React from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

const Menu = () => {
	return (
			<Menu attached='top'>
				<div className='ui right aligned category search item'>
					<div className='ui transparent icon input'>
						<input className='prompt' type='text' placeholder='Search animals...' />
						<i className='search link icon' />
					</div>
					<div className='results'></div>
				</div>		
				<Menu.Menu position='right'>
					<Dropdown as={Menu.Item} icon='wrench' simple>
						<Dropdown.Menu>
							<Dropdown.Item>
								<Icon name='dropdown' />
								<span className='text'>New</span>
								<Dropdown.Menu>
									<Dropdown.Item>Document</Dropdown.Item>
									<Dropdown.Item>Image</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown.Item>
							<Dropdown.Item>Open</Dropdown.Item>
							<Dropdown.Item>Save...</Dropdown.Item>
							<Dropdown.Item>Edit Permissions</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Header>Export</Dropdown.Header>
							<Dropdown.Item>Share</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</Menu>
			)
}

export default Menu
