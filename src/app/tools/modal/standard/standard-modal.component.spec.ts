import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoModalRef, NovoModalParams, NovoElementsModule } from 'novo-elements';
import { StandardModalComponent } from './standard-modal.component';

describe('StandardModalComponent', () => {
  let component: StandardModalComponent;
  let fixture: ComponentFixture<StandardModalComponent>;
  let mockModalRef: jest.Mocked<NovoModalRef>;
  let mockModalParams: NovoModalParams;

  beforeEach(async () => {
    // Create Jest mocks
    mockModalRef = {
      close: jest.fn(),
      dismiss: jest.fn()
    } as any;

    mockModalParams = {
      // Add any properties that StandardModalParams.fromNovo() expects
      // Based on typical modal params, these might include:
      title: 'Test Modal',
      message: 'Test message',
      onClose: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [StandardModalComponent],
      imports: [NovoElementsModule],
      providers: [
        { provide: NovoModalRef, useValue: mockModalRef },
        { provide: NovoModalParams, useValue: mockModalParams }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StandardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalParams from NovoModalParams', () => {
    expect(component.modalParams).toBeDefined();
  });

  it('should call modalRef.close with false when close() is called', () => {
    component.close();
    
    expect(mockModalRef.close).toHaveBeenCalledWith(false);
  });

  it('should call modalRef.close with true when yes() is called', () => {
    component.yes();
    
    expect(mockModalRef.close).toHaveBeenCalledWith(true);
  });

  it('should call onClose callback with false when close() is called and onClose is defined', () => {
    const onCloseSpy = jest.fn();
    component.modalParams.onClose = onCloseSpy;
    
    component.close();
    
    expect(onCloseSpy).toHaveBeenCalledWith(false);
    expect(mockModalRef.close).toHaveBeenCalledWith(false);
  });

  it('should call onClose callback with true when yes() is called and onClose is defined', () => {
    const onCloseSpy = jest.fn();
    component.modalParams.onClose = onCloseSpy;
    
    component.yes();
    
    expect(onCloseSpy).toHaveBeenCalledWith(true);
    expect(mockModalRef.close).toHaveBeenCalledWith(true);
  });

  it('should not throw error when close() is called and onClose is undefined', () => {
    component.modalParams.onClose = undefined;
    
    expect(() => component.close()).not.toThrow();
    expect(mockModalRef.close).toHaveBeenCalledWith(false);
  });

  it('should not throw error when yes() is called and onClose is undefined', () => {
    component.modalParams.onClose = undefined;
    
    expect(() => component.yes()).not.toThrow();
    expect(mockModalRef.close).toHaveBeenCalledWith(true);
  });
});
