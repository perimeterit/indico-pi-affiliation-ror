from marshmallow import ValidationError, fields, post_load, pre_load, validate

from indico.core.marshmallow import mm
from indico.modules.events.registration.fields.base import RegistrationFormFieldBase
from indico.util.i18n import _
from indico.util.marshmallow import not_empty


class RORFieldDataSchema(mm.Schema):
    # rorId = fields.String(required=True, validate=not_empty)  # noqa: N815
    rorId = fields.String(validate=not_empty)  # noqa: N815
    institutionName = fields.String(validate=not_empty)  # noqa: N815

class RORField(RegistrationFormFieldBase):
    name = 'ext__ror'

    mm_field_class = fields.List
    mm_field_args = (fields.Nested(RORFieldDataSchema),)
    setup_schema_base_cls = RORFieldDataSchema
    
    @property
    def default_value(self):
        return []
    
    def get_friendly_data(self, registration_data, for_humans=False, for_search=False):
        reg_data = registration_data.data  # if registration_data else None
        if not reg_data:
            return ''
        
        item = reg_data[0] 
        return f'{item['rorId']}, {item['institutionName']}' if 'institutionName' in item else ''
