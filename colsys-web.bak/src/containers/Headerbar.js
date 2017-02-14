import React from 'react'
import { Dropdown, Menu, Container } from 'semantic-ui-react'

const Headerbar = () => {
	return (
			<Menu borderless inverted color='blue' attached='top'>
				<Container>
					<Menu.Item header>ColSys </Menu.Item>

					<Menu.Menu position='right'>
						<Dropdown as={Menu.Item} icon='setting' simple>
							<Dropdown.Menu>
								<Dropdown.Item>Menu 1</Dropdown.Item>
								<Dropdown.Item>Menu 2</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>Menu 3</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Menu>
				</Container>
			</Menu>
			)
}

export default Headerbar
