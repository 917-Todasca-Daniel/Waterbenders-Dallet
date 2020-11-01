from datetime import datetime


def get_date_from_string(date):
    print('date to conver: ', date)
    return datetime.strptime(date, '%d/%m/%Y').date() if date != '' else None


class CreateReminderRequest:
    def __init__(self, json_dict):
        self.name = json_dict['name']
        self.remind_date = get_date_from_string(json_dict['date'])


class CreateDocumentRequest:
    def __init__(self, json_dict):
        try:
            self.user_email = json_dict['user_email']
            self.document_name = json_dict['document_name']
            self.upload_date = get_date_from_string(json_dict['upload_date'])
            self.expire_date = get_date_from_string(json_dict['expire_date']) if 'expire_date' in json_dict else None
            self.content = json_dict['content']
        except Exception as ex:
            print('EXCEPTION!!!!! ', str(ex))
