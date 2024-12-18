from marshmallow import fields, ValidationError #, validate #,  post_load, pre_load

from indico.core.marshmallow import mm
from indico.modules.events.registration.fields.base import RegistrationFormFieldBase
from indico.util.i18n import _
# from indico.util.marshmallow import not_empty

class RORFieldDataSchema(mm.Schema):
    rorId = fields.String()  # noqa: N815
    institutionName = fields.String()  # noqa: N815

class RORField(RegistrationFormFieldBase):
    name = 'ext__ror'

    mm_field_class = fields.List
    mm_field_args = (fields.Nested(RORFieldDataSchema),)
    setup_schema_base_cls = RORFieldDataSchema
    
    @property
    def default_value(self):
        return []
    
    @property
    def mm_field_kwargs(self):
        return {'allow_none': not self.form_item.is_required}
    
    def get_friendly_data(self, registration_data, for_humans=False, for_search=False):
        reg_data = registration_data.data
        if not reg_data:
            return ''

        item = reg_data[0] 
        if item.get('institutionName'):
            return f'{item['institutionName']} ({item['rorId'] or '-non ROR-'})'
        
        return ''
    
    def get_validators(self, existing_registration):
        # if the field is required, then make sure that an institution name is entered
        def _check_affilation_name_exists(new_data):
            if self.form_item.is_required:
                if new_data:
                    institution = new_data[0]['institutionName'] or ''
                    if not institution:
                        raise ValidationError(_('Please enter an Affiliation'))
                        
                if not new_data:
                    raise ValidationError(_('Please enter an Affiliation'))
        
        return _check_affilation_name_exists
