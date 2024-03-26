import { HttpErrorResponse } from '@angular/common/http';
import { UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

export class Utils {
  /**
   * Validate if the password and confirm password fields match
   * @param group - Form group containing the password and confirm password fields
   * @returns - Validation result
   */
  static passwordMatchValidator(
    group: UntypedFormGroup
  ): { [key: string]: boolean } | null {
    if (!group) return {};
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (!password || !confirmPassword) return {};
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMatch: 'Passwords do not match.' });
    } else {
      confirmPassword.setErrors(null);
      return password.value === confirmPassword.value
        ? null
        : { passwordMatch: true };
    }
    return null;
  }

  /**
   * Inject the given parameters into the given endpoint
   * @param endpoint - Endpoint with parameters to be injected
   * @param params - Parameters to be injected
   * @returns - Endpoint with injected parameters
   */
  static InjectUrlParams(endpoint: string, params: any): string {
    if (params) {
      for (const param of Object.keys(params)) {
        endpoint = endpoint.replace('{' + param + '}', params[param]);
      }
    }

    return endpoint;
  }

  /**
   * Remove null values from the given object
   * @param object
   * @returns
   */
  static RemoveNullValues(object: any): any {
    if (!object) {
      return null;
    }

    const objectToReturn: any = {};
    for (const key of Object.keys(object)) {
      if (object[key] !== null) {
        objectToReturn[key] = object[key];
      }
    }
    return objectToReturn;
  }

  /**
   * Unsubscribe from the given subscription(s)
   * @param subscriptions - Subscription or Subscription[]
   * @returns
   */
  static Unsubscribe(subscriptions: Subscription | Subscription[]) {
    if (Array.isArray(subscriptions)) {
      for (const subscription of subscriptions) {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    } else if (subscriptions) {
      subscriptions.unsubscribe();
    }
  }

  /**
   * Extract the error message from the given HTTP Error Response
   * @param errorResponse - HTTP Error Response
   * @returns - Error message
   */
  static MessageFromErrorResponse(errorResponse: HttpErrorResponse): any {
    if (errorResponse) {
      return errorResponse.error && errorResponse.error.Message
        ? errorResponse.error.Message
        : errorResponse.statusText;
    }
  }
}
