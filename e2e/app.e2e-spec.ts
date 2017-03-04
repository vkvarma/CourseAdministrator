import { CourseAdministratorPage } from './app.po';

describe('course-administrator App', function() {
  let page: CourseAdministratorPage;

  beforeEach(() => {
    page = new CourseAdministratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
