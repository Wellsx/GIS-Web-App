import Map from '../POM/pages/map.page';
import ERMenu from '../POM/components/er.menu';
import Data from '../support/data';
describe('Map test suite', { tags: ['@regression', '@map'] }, () => {
	beforeEach(() => {
		cy.viewport(1440, 900); // set the viewport to 1440x900 for headless run consistency
		cy.waitForMapboxApi();
	});
	afterEach(() => {
		// wait 2 seconds to ensure screenshot accuracy
		cy.wait(2000);
		cy.screenshot({ capture: 'fullPage' });
	});
	it(
		'Activate Solar Panel layer, verify that the layer is visible',
		{ tags: ['@smoke', '@solar'] },
		() => {
			ERMenu.expand_Menu().open_Energy_Resources().activate_Solar_Panel();
		}
	);
	it(
		'Activate Wind Farm layer, verify that the layer is visible',
		{ tags: ['@smoke', '@wind'] },
		() => {
			ERMenu.expand_Menu().open_Energy_Resources().activate_Vjetroelektrane();
		}
	);
	it(
		'Activate Solar Panel and Wind Farm layer, verify both layers are visible',
		{ tags: ['@smoke', '@solar', '@wind'] },
		() => {
			ERMenu.expand_Menu()
				.open_Energy_Resources()
				.activate_Solar_Panel()
				.activate_Vjetroelektrane();
		}
	);
	it('Verify Search functionality', { tags: ['@map-tools', '@search'] }, () => {
		Map.search_Location(Data.city);
	});
	it('Verify Zoom in functionality', { tags: ['@map-tools'] }, () => {
		Map.click_Zoom_in(2);
	});
	it('Verify Zoom out functionality', { tags: ['@map-tools'] }, () => {
		Map.click_Zoom_out(2);
	});
	it(
		'Verify map moving functionality',
		{ tags: ['@map-tools', '@smoke'] },
		() => {
			Map.move_Map(5);
		}
	);
	it(
		'Verify map rotating functionality',
		{ tags: ['@map-tools', '@smoke'] },
		() => {
			Map.rotate_Map(3);
		}
	);
	it(
		'Verify reset bearing to north functionality',
		{ tags: ['@map-tools', '@smoke'] },
		() => {
			Map.rotate_Map(3);
			// wait 2 seconds for screenshot accuracy
			cy.wait(2000);
			cy.screenshot();
			Map.click_Compass();
		}
	);
	it(
		'Verify map panning functionality',
		{ tags: ['@map-tools', '@smoke'] },
		() => {
			Map.pan_Map(5);
		}
	);

	it('Verify Line drawing', { tags: ['@map-tools'] }, () => {
		Map.draw_Line();
	});
	it('Verify multiple line drawing', { tags: ['@map-tools'] }, () => {
		Map.draw_Multiple_Lines();
	});
	it('Verify Polygon drawing', { tags: ['@map-tools'] }, () => {
		Map.draw_Polygon();
	});
	it('Verify multiple polygon drawing', { tags: ['@map-tools'] }, () => {
		Map.draw_Multiple_Polygons();
	});
	it('Verify drawing a polygon and line', { tags: ['@map-tools'] }, () => {
		Map.draw_Polygon().draw_Line();
	});
	it('Verify deleting a geometry', { tags: ['@map-tools'] }, () => {
		Map.draw_Polygon();
		// wait 2 seconds for screenshot accuracy
		cy.wait(2000);
		cy.screenshot();
		Map.delete_Geometry();
	});
	it('Verify cancel drawing', { tags: ['@map-tools'] }, () => {
		Map.cancel_Drawing();
	});
});
