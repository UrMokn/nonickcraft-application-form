import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import {
  ExistApplicationAlert,
  JoinedDeniedGuildsAlert,
  LoginAlert,
  NotJoinedAlert,
  NotMeetRequirementsAlert,
} from './alerts';
import { Form } from './form';
import { CheckRequirementsError, checkRequirements } from './util';

export default async function Home() {
  const res = await checkRequirements();

  if (!res?.ok) {
    switch (res?.error) {
      case CheckRequirementsError.LoginRequired:
        return <LoginAlert />;
      case CheckRequirementsError.ExistApplication:
        return <ExistApplicationAlert />;
      case CheckRequirementsError.NotJoined:
        return <NotJoinedAlert />;
      case CheckRequirementsError.JoinedDeniedGuilds:
        return <JoinedDeniedGuildsAlert />;
      case CheckRequirementsError.NotMeetRequirements:
        return <NotMeetRequirementsAlert />;
      default:
        return (
          <Alert variant='danger'>
            <AlertTitle>不明なエラーが発生しました</AlertTitle>
            <AlertDescription>{res?.error}</AlertDescription>
          </Alert>
        );
    }
  }

  return <Form />;
}
