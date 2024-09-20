from flask import g, request, session

from indico.core.plugins import IndicoPlugin, IndicoPluginBlueprint, plugin_url_rule_to_js, url_for_plugin

# from indico.web.menu import TopMenuSection, SideMenuItem, TopMenuItem

# from indico.core import signals

# from indico.modules.events import Event
# from indico.modules.events.models.events import EventType
# from indico.modules.events.contributions import Contribution
# from indico.modules.events.sessions.models.blocks import SessionBlock
# from indico.modules.events.timetable.models.breaks import Break

from pi_affiliation_ror.blueprint import blueprint



class PIAffiliationROR(IndicoPlugin):
    """PI Affiliation ROR Plugin

    This plugin allows adding ROR to Indico registration forms
    """

    # configurable = True
    # settings_form = SeminarManagementSettingsForm
    # default_settings = {
    #     'seminar_category_id': None
    # }
    # acl_settings = {'seminar_management_users'}
    
    def init(self):
        super().init()

        # # self.inject_bundle('main.css', WPRequestsEventManagement, subclasses=False, condition=True)
        # self.inject_bundle('main.css', WPSeminarManagement)
        # self.inject_bundle('main.css', WPPICategoriesSettings)

        # self.connect(signals.menu.sections, self._add_section)
        # self.connect(signals.menu.items, self._add_seminars_management_top_menu, sender='top-menu')

        # self.connect(signals.menu.items, self._add_categories_side_menu, sender='category-management-sidemenu')

    def get_blueprints(self):
        yield blueprint