import {
  FreeCamera,
  ICameraInput,
  Observable,
  PointerEventTypes,
  Tools,
} from '@babylonjs/core';

export class FreeCameraCustomMouseInput implements ICameraInput<FreeCamera> {
  touchEnabled: boolean;

  camera!: FreeCamera;

  buttons: number[];

  angularSensibility: number;
  private _pointerInput: any;
  private _onMouseMove: any;
  private _observer: any;
  private _previousPosition: any;
  private _YAxisFactor: number = -1;
  private _XAxisFactor: number = 1;

  onPointerMovedObservable: Observable<{
    offsetX: number;
    offsetY: number;
  }>;

  _allowCameraRotation: boolean;
  private _currentActiveButton;
  private _activePointerId;
  private _contextMenuBind: any;

  constructor(touchEnabled = true) {
    this.touchEnabled = touchEnabled;
    /**
     * Defines the buttons associated with the input to handle camera move.
     */
    this.buttons = [0, 1, 2];
    /**
     * Defines the pointer angular sensibility  along the X and Y axis or how fast is the camera rotating.
     */
    this.angularSensibility = 2000.0;
    this._previousPosition = null;
    /**
     * Observable for when a pointer move event occurs containing the move offset
     */
    this.onPointerMovedObservable = new Observable();
    /**
     * @internal
     * If the camera should be rotated automatically based on pointer movement
     */
    this._allowCameraRotation = true;
    this._currentActiveButton = -1;
    this._activePointerId = -1;
  }

  toggleInvertYAxis() {
    this._YAxisFactor *= -1;
  }
  toggleInvertXAxis() {
    this._XAxisFactor *= -1;
  }

  set invertXAxis(invert: boolean) {
    this._XAxisFactor = invert ? -1 : 1;
  }

  attachControl(noPreventDefault: boolean) {
    // eslint-disable-next-line prefer-rest-params
    noPreventDefault = Tools.BackCompatCameraNoPreventDefault(arguments);
    const engine = this.camera.getEngine();
    const element = engine.getInputElement();
    if (!this._pointerInput) {
      this._pointerInput = (p: any) => {
        const evt = p.event;
        const isTouch = evt.pointerType === 'touch';
        if (engine.isInVRExclusivePointerMode) {
          return;
        }
        if (!this.touchEnabled && isTouch) {
          return;
        }
        if (
          p.type !== PointerEventTypes.POINTERMOVE &&
          this.buttons.indexOf(evt.button) === -1
        ) {
          return;
        }
        const srcElement = evt.target;
        if (p.type === PointerEventTypes.POINTERDOWN) {
          // If the input is touch with more than one touch OR if the input is mouse and there is already an active button, return
          if (
            (isTouch && this._activePointerId !== -1) ||
            (!isTouch && this._currentActiveButton !== -1)
          ) {
            return;
          }
          this._activePointerId = evt.pointerId;
          try {
            srcElement === null || srcElement === void 0
              ? void 0
              : srcElement.setPointerCapture(evt.pointerId);
          } catch (e) {
            //Nothing to do with the error. Execution will continue.
          }
          if (this._currentActiveButton === -1) {
            this._currentActiveButton = evt.button;
          }
          this._previousPosition = {
            x: evt.clientX,
            y: evt.clientY,
          };
          if (!noPreventDefault) {
            evt.preventDefault();
            element && element.focus();
          }
          // This is required to move while pointer button is down
          if (engine.isPointerLock && this._onMouseMove) {
            this._onMouseMove(p.event);
          }
        } else if (p.type === PointerEventTypes.POINTERUP) {
          // If input is touch with a different touch id OR if input is mouse with a different button, return
          if (
            (isTouch && this._activePointerId !== evt.pointerId) ||
            (!isTouch && this._currentActiveButton !== evt.button)
          ) {
            return;
          }
          try {
            srcElement === null || srcElement === void 0
              ? void 0
              : srcElement.releasePointerCapture(evt.pointerId);
          } catch (e) {
            //Nothing to do with the error.
          }
          this._currentActiveButton = -1;
          this._previousPosition = null;
          if (!noPreventDefault) {
            evt.preventDefault();
          }
          this._activePointerId = -1;
        } else if (
          p.type === PointerEventTypes.POINTERMOVE &&
          (this._activePointerId === evt.pointerId || !isTouch)
        ) {
          if (engine.isPointerLock && this._onMouseMove) {
            this._onMouseMove(p.event);
          } else if (this._previousPosition) {
            let offsetX = evt.clientX - this._previousPosition.x;
            const offsetY = evt.clientY - this._previousPosition.y;
            if (this.camera.getScene().useRightHandedSystem) {
              offsetX *= -1;
            }
            if (
              this.camera.parent &&
              this.camera.parent._getWorldMatrixDeterminant() < 0
            ) {
              offsetX *= -1;
            }
            if (this._allowCameraRotation) {
              this.camera.cameraRotation.y += offsetX / this.angularSensibility;
              this.camera.cameraRotation.x += offsetY / this.angularSensibility;
            }
            this.onPointerMovedObservable.notifyObservers({
              offsetX: offsetX,
              offsetY: offsetY,
            });
            this._previousPosition = {
              x: evt.clientX,
              y: evt.clientY,
            };
            if (!noPreventDefault) {
              evt.preventDefault();
            }
          }
        }
      };
    }
    this._onMouseMove = (evt: MouseEvent) => {
      if (!engine.isPointerLock) {
        return;
      }
      if (engine.isInVRExclusivePointerMode) {
        return;
      }
      let offsetX = evt.movementX;
      if (this.camera.getScene().useRightHandedSystem) {
        offsetX *= -1;
      }
      if (
        this.camera.parent &&
        this.camera.parent._getWorldMatrixDeterminant() < 0
      ) {
        offsetX *= -1;
      }
      this.camera.cameraRotation.y +=
        (offsetX * this._XAxisFactor) / this.angularSensibility;
      const offsetY = evt.movementY;
      this.camera.cameraRotation.x +=
        (offsetY * this._YAxisFactor) / this.angularSensibility;
      this._previousPosition = null;
      if (!noPreventDefault) {
        evt.preventDefault();
      }
    };
    this._observer = this.camera
      .getScene()
      ._inputManager._addCameraPointerObserver(
        this._pointerInput,
        PointerEventTypes.POINTERDOWN |
          PointerEventTypes.POINTERUP |
          PointerEventTypes.POINTERMOVE
      );
    if (element) {
      this._contextMenuBind = this.onContextMenu.bind(this);
      element.addEventListener('contextmenu', this._contextMenuBind, false); // TODO: We need to figure out how to handle this for Native
    }
  }

  onContextMenu(evt: PointerEvent): void {
    evt.preventDefault();
  }

  detachControl(): void {
    if (this._observer) {
      this.camera
        .getScene()
        ._inputManager._removeCameraPointerObserver(this._observer);
      if (this._contextMenuBind) {
        const engine = this.camera.getEngine();
        const element = engine.getInputElement();
        element &&
          element.removeEventListener('contextmenu', this._contextMenuBind);
      }
      if (this.onPointerMovedObservable) {
        this.onPointerMovedObservable.clear();
      }
      this._observer = null;
      this._onMouseMove = null;
      this._previousPosition = null;
    }
    this._activePointerId = -1;
    this._currentActiveButton = -1;
  }

  getClassName(): string {
    return 'FreeCameraCustomMouseInput';
  }
  getSimpleName(): string {
    return 'mouse';
  }
}
